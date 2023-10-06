import { CloudUpload } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';
import {
  AvatarImageContainer,
  AvatarProfile,
  ButtonCancel,
  ErrorText,
  OptionsButtonsContainer,
  VisuallyHiddenInput,
} from './AvatarImage.styled';
import { useGetCurrentUserData } from '../../../../shared/hooks/useGetCurrentUserData';
import { useCallback, useEffect, useState } from 'react';
import { useChangeUserAvatarMutation } from '../../../../redux/slicesApi/userListApi';
import { useDispatch } from 'react-redux';
import { articlesApi } from '../../../../redux/slicesApi/articlesApi';
import { searchApi } from '../../../../redux/slicesApi/searchSliceApi';

export const AvatarImage = () => {
  const [changeAvatar, { error, isLoading }] = useChangeUserAvatarMutation();
  const { data } = useGetCurrentUserData();
  const dispatch = useDispatch();

  const [image, setImage] = useState<string | null>(null);
  const [typeImage, setTypeImage] = useState<string | null>(null);
  const [showSaveButton, setShowSaveButton] = useState<boolean>(false);

  useEffect(() => {
    if (data?.avatar) {
      const avatar = `data:${data?.avatar?.contentType};base64,${data?.avatar?.image}`;
      setImage(avatar);
    }
  }, [data?.avatar]);

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setTypeImage(file.type);
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          const base64Image = e.target.result;
          setImage(base64Image as string);
          setShowSaveButton(true);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleCancelClick = useCallback(() => {
    const avatar = `data:${data?.avatar?.contentType};base64,${data?.avatar?.image}`;
    setImage(avatar);
    setShowSaveButton(false);
  }, [data?.avatar?.contentType, data?.avatar?.image]);

  const saveAvatar = () => {
    if (image) {
      changeAvatar({ image: image.replace(/^data:image\/[a-z]+;base64,/, ''), contentType: typeImage });
      dispatch(articlesApi.util.invalidateTags(['Author']));
      dispatch(searchApi.util.invalidateTags(['Author']));
    }
    if (!isLoading && !error) {
      setShowSaveButton(false);
    }
  };

  return (
    <AvatarImageContainer>
      {image ? (
        <AvatarProfile
          alt='Avatar'
          src={image}
        />
      ) : (
        <AvatarProfile>{data?.name[0]}</AvatarProfile>
      )}
      {error ? <ErrorText>Please upload only png/jpeg/jpg and less 5 mb</ErrorText> : null}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {showSaveButton ? (
            <OptionsButtonsContainer>
              <ButtonCancel
                variant='outlined'
                onClick={handleCancelClick}
              >
                Cancel
              </ButtonCancel>
              <Button
                variant='contained'
                onClick={saveAvatar}
              >
                Save
              </Button>
            </OptionsButtonsContainer>
          ) : (
            <Button
              component='label'
              variant='contained'
              startIcon={<CloudUpload />}
            >
              Upload image
              <VisuallyHiddenInput
                type='file'
                onChange={handleChangeImage}
                accept='image/png, image/jpeg, image/jpg'
              />
            </Button>
          )}
        </>
      )}
    </AvatarImageContainer>
  );
};
