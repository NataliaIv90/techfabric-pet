import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  CreateArticleWrapper,
  FormBorder,
  StyledButton,
  ImageBtnContainer,
  ErrorMessage,
  HiddenInput,
  ButtonsContainer,
  ImageInputLabel,
  StyledInput,
  StyledInputLarge,
  ArticleFormContainer,
  ImageInputContainer,
  ImagePreview,
  ContentContainer
} from './CreateArticle.styled';
import { CircularProgress } from "@mui/material";
import './CreateArticle.css';
import { ICreateArticleFormData } from '../../types/article';
import { usePostArticleMutation, useUploadImageMutation } from '../../redux/slicesApi/articlesApi';
import { Article } from '../../shared/components/article/Article';
import { ArticleTips } from './articleTips/ArticleTips';
import { scrollToTop } from '../../shared/utils/scrollToTop';

const validationSchema: Yup.ObjectSchema<ICreateArticleFormData> = Yup.object().shape({
  mainImage: Yup.string().required('This is required field'),
  name: Yup.string()
    .required('This is required field')
    .min(1, 'An article\'s title should be at least 1 symbol')
    .max(100, 'Title can\'t be longer than 100 symbols'),
  description: Yup.string().required('This is required field').max(1000, 'Description should be up to 1000 symbols'),
  content: Yup.string().required('This is required field').min(20, 'This content is too short'),
  gameType: Yup.string().nullable().max(100, 'Game type can\'t be longer than 100 symbols'),
  platform: Yup.string().nullable().max(100, 'Platform can\'t be longer than 100 symbols'),
  year: Yup.number()
    .typeError('Year must be a number')
    .integer('Year must be an integer')
    .moreThan(999, 'Year must be greater than or equal to 1000')
    .lessThan(3001, 'Year should be less than or equal to 3000')
    .nullable()
    .transform((v, o) => o ? v : null),
  tags: Yup.string()
    .matches(/^(?:#(?:[a-zA-Z0-9_]{1,15}) ){0,4}#(?:[a-zA-Z0-9_]{1,15})$|^$/,
      'Enter from 1 to 5 tags in format #tag divided by 1 whitespace. Tag can include letters, numbers and _ symbol. Max length of tag - 15 symbols')
    .nullable(),
});

export const CreateArticle = () => {
  const navigate = useNavigate();
  const [postArticle, { isLoading, error, isSuccess }] = usePostArticleMutation();
  const quillRef = useRef<ReactQuill | null>(null);
  const [editMode, setEditMode] = useState<boolean>(true);
  const [, setImagePicked] = useState<boolean>(false);
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const [uploadImage] = useUploadImageMutation();
  const [quillError, setQuillError] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');

  const handleClick = useCallback(() => {
    if (hiddenFileInput?.current) {
      hiddenFileInput.current.click()
    }
  }, []);

  const togglePreview = useCallback(() => {
    scrollToTop();
    setEditMode(!editMode);
  }, [editMode]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/article-created')
    };
  }, [isSuccess, navigate]);

  const { control, handleSubmit, register, watch, setValue, formState: { errors }, getValues } = useForm<ICreateArticleFormData>({
    defaultValues: {
      mainImage: '',
      name: '',
      description: '',
      content: 'Enter your content...',
      year: 0,
      gameType: '',
      platform: '',
      tags: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const handleImage = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageError('');
    const file = event.target?.files?.[0];
    if (file) {
      setValue('mainImage', '');
      setImagePicked(false);
      const maxSize = 1024 * 1024 * 5;
      if (file.size > maxSize) {
        setImageError('File size exceeds the maximum allowed size (5 MB).');
        return;
      }
      if (!/^image\//.test(file.type)) {
        setImageError('Wrong file type. ');
        return;
      }
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (event) => {
        const base64Image = event.target?.result ? `data:${file.type};base64,${btoa(event.target.result as string)}` : '';
        setImagePicked(!!base64Image);
        setValue('mainImage', base64Image);
      };
      reader.onerror = () => {
        setImageError('Can\'t read the file');
      };
    }
  }, [setValue, setImagePicked, setImageError]);

  useEffect(() => {
    register('content', { required: true, minLength: 100 });
    register('mainImage', { required: true, })
  }, [register]);

  const onEditorStateChange = useCallback((content: string, delta: unknown, source: unknown, editor: unknown) => {
    setValue('content', content);
  }, [setValue]);

  const imageHandler = useCallback(() => {
    setQuillError('');
    if (!quillRef?.current) return;

    const editor = quillRef.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async (e: Event) => {
      const selection = editor?.getSelection();
      if (!selection || !input.files) return;

      const file = input.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setQuillError('File size exceeds the maximum allowed size (5 MB).');
        return;
      }

      if (!/^image\//.test(file.type)) {
        setQuillError('Wrong file type.');
        return;
      }

      const formData = new FormData();
      formData.append('File', file);

      uploadImage(formData)
        .unwrap()
        .then((response) => {
          if ('url' in response) {
            editor.insertEmbed(selection.index, 'image', (response as { url: string }).url);
            return;
          };
        })
        .catch((error) => {
          setQuillError(error.data);
          return;
        });
    };
  }, [setQuillError]);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        ['bold'], ['italic'], ['link'],
        [{ 'list': 'bullet' }],
        [{ 'header': ['2', '3'] }],
        ['blockquote', 'image'],
      ],
      'handlers': {
        image: imageHandler
      }
    }
  }), [imageHandler]);

  const onSubmit: SubmitHandler<ICreateArticleFormData> = useCallback(({ mainImage, name, platform, year, gameType, tags, description, content }) => {
    postArticle({
      mainImage: mainImage.split(',')[1],
      contentType: mainImage.split(',')[0].split(':')[1].split(';')[0],
      year: year || 0,
      tags: tags?.length ? tags?.trim().split(' ').map((tag) => ({ name: tag })) : [],
      name,
      gameType: gameType || null,
      platform: platform || null,
      content,
      description,
    });
  }, [postArticle]);

  const removeCustomErrors = useCallback(() => {
    setImageError('');
    setQuillError('');
  }, [])

  return (
    <CreateArticleWrapper>
      <ContentContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          {editMode ?
            <ArticleFormContainer>
              <FormBorder>
                <ImageInputContainer>
                  <Controller
                    name='mainImage'
                    control={control}
                    render={({ field }) => (
                      <HiddenInput type='text' {...field} />
                    )}
                  />
                  <ImageBtnContainer>
                    <HiddenInput
                      type='file'
                      name='inputImage'
                      id='imageInputHidden'
                      ref={hiddenFileInput}
                      onChange={handleImage}
                      accept='image/png, image/jpeg'
                    />
                    <label htmlFor='imageInputHidden'>
                      <StyledButton variant='outlined' onClick={handleClick}>{!getValues().mainImage ? 'Upload Image' : 'Change Image'}</StyledButton>
                    </label>
                    <ImagePreview image={getValues().mainImage}></ImagePreview>
                  </ImageBtnContainer>
                  <ImageInputLabel>
                    <p>Make sure you use an image of the right size and proportion:</p>
                    <p>use a 100:42 ratio for best results, .jpeg or .png files.</p>
                  </ImageInputLabel>
                </ImageInputContainer>
                <ErrorMessage>
                  {errors.mainImage && !getValues().mainImage ? `${errors.mainImage.message}. ` : null}
                  {imageError ? `${imageError}` : null}
                </ErrorMessage>
                <Controller
                  control={control}
                  name='name'
                  render={({ field, fieldState }) => (
                    <div>
                      <StyledInputLarge
                        type='text'
                        variant='standard'
                        value={field.value}
                        error={!!fieldState.error}
                        onChange={field.onChange}
                        placeholder='Enter the name...'
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                      {fieldState.error ? <ErrorMessage>{fieldState.error.message}</ErrorMessage> : null}
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name='gameType'
                  render={({ field, fieldState }) => (
                    <>
                      <StyledInput
                        type='text'
                        variant='standard'
                        value={field.value || ''}
                        onChange={field.onChange}
                        placeholder='Enter the type of game...'
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                      {fieldState.error ? <ErrorMessage>{fieldState.error.message}</ErrorMessage> : null}
                    </>
                  )}
                />
                <Controller
                  control={control}
                  name='platform'
                  render={({ field, fieldState }) => (
                    <div>
                      <StyledInput
                        type='text'
                        variant='standard'
                        value={field.value || ''}
                        onChange={field.onChange}
                        placeholder='Enter the platform...'
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                      {fieldState.error ? <ErrorMessage>{fieldState.error.message}</ErrorMessage> : null}
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name='year'
                  render={({ field, fieldState }) => (
                    <div>
                      <StyledInput
                        type='text'
                        variant='standard'
                        value={field.value || ''}
                        onChange={field.onChange}
                        placeholder='Enter the year...'
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                      {fieldState.error ? <ErrorMessage>{fieldState.error.message}</ErrorMessage> : null}
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name='tags'
                  render={({ field, fieldState }) => (
                    <div>
                      <StyledInput
                        type='text'
                        variant='standard'
                        value={field.value || ''}
                        onChange={field.onChange}
                        placeholder='Enter tags (1-5)...'
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                      {fieldState.error ? <ErrorMessage>{fieldState.error.message}</ErrorMessage> : null}
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name='description'
                  render={({ field, fieldState }) => (
                    <div>
                      <StyledInput
                        type='text'
                        variant='standard'
                        value={field.value}
                        onChange={field.onChange}
                        placeholder='Enter the description...'
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                      {fieldState.error ? <ErrorMessage>{fieldState.error.message}</ErrorMessage> : null}
                    </div>
                  )}
                />
              </FormBorder>
              <div>
                <ReactQuill
                  ref={quillRef}
                  theme='snow'
                  defaultValue={getValues().content ? watch('content') : 'Content...'}
                  onChange={(content, delta, source, editor) => onEditorStateChange(content, delta, source, editor)}
                  placeholder='Write your article content here...'
                  modules={modules}
                />
              </div>
              {quillError ? <ErrorMessage>{quillError}</ErrorMessage> : null}
              <ErrorMessage>{errors.content ? `Enter valid content. ${errors?.content?.message}.` : null}</ErrorMessage>
            </ArticleFormContainer>
            :
            <Article
              name={getValues().name}
              mainImage={getValues().mainImage}
              tags={getValues().tags}
              content={getValues().content}
              year={getValues().year}
              platform={getValues().platform}
              gameType={getValues().gameType}
            />
          }
          {error && 'data' in error ? <ErrorMessage>Your article wasn't published. {JSON.stringify(error?.data)} </ErrorMessage> : null}

          <ButtonsContainer>
            {isLoading
              ? (<CircularProgress />)
              : (<StyledButton variant='outlined' type='submit' onClick={removeCustomErrors}>Publish Article</StyledButton>)}
            <StyledButton type='button' onClick={togglePreview}>
              {editMode
                ? 'Preview Article'
                : 'Edit Article'}
            </StyledButton>

          </ButtonsContainer>
        </form>
      </ContentContainer >
      <div>
        <ArticleTips />
      </div>
    </CreateArticleWrapper >)
}
