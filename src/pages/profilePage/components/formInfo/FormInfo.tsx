import { useState } from 'react';
import { StyledForm, StyledFormWrapper } from '../../../auth/authWrapper/AuthWrapper.styled';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputComponent } from '../../../../shared/components/Input';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { Button, CircularProgress } from '@mui/material';
import { useGetCurrentUserData } from '../../../../shared/hooks/useGetCurrentUserData';
import { TextInfo, TextInfoContainer } from './FormInfo.styled';
import { ButtonCancel, ErrorText } from '../avatarImage/AvatarImage.styled';
import { useChangeUserInfoMutation } from '../../../../redux/slicesApi/userListApi';
import { articlesApi } from '../../../../redux/slicesApi/articlesApi';
import { searchApi } from '../../../../redux/slicesApi/searchSliceApi';
import { useDispatch } from 'react-redux';
import { deepEqual } from '../../../../shared/utils/deepEqual';

interface ICurrentUserResponse {
  userName?: string;
  name?: string;
  surname?: string;
  [key: string]: string | undefined;
}

const validationSchema: Yup.ObjectSchema<{ userName?: string; name?: string; surname?: string }> = Yup.object().shape({
  userName: Yup.string()

    .min(3, 'Username should be min 3 characters')
    .max(50, 'This username is too long')
    .matches(
      /^(?=.{2,50}$)[A-Za-z0-9\-_+=!]*$/,
      'Username can contain only latin letters, numbers and special characters -,_,+,=,!'
    ),
  name: Yup.string()

    .min(2, 'Name should be min 2 characters')
    .max(50, 'This name is too long')
    .matches(/^([A-Z][a-z]*)$/g, 'Name can only contain latin letters, start from capital letter'),
  surname: Yup.string()

    .min(2, 'Surname should be min 2 characters')
    .max(50, 'This surname is too long')
    .matches(/^([A-Z][a-z]*)$/g, 'Surname can only contain latin letters,  start from capital letter'),
});

export const FormInfo = () => {
  const [changeInfo, { isLoading, error }] = useChangeUserInfoMutation();
  const [errorMessage, setErrorMessage] = useState('');
  const { data, refetch } = useGetCurrentUserData();
  const [showInputs, setShowInputs] = useState<string[]>(['']);

  const dispatch = useDispatch();

  const { control, handleSubmit, setValue } = useForm<{
    userName?: string;
    name?: string;
    surname?: string;
  }>({
    defaultValues: {
      userName: data?.userName,
      name: data?.name,
      surname: data?.surname,
    },

    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<{ userName?: string; name?: string; surname?: string }> = async (dataInfo) => {
    if (data && Object.keys(dataInfo).length) {
      const currentData = { name: data.name, userName: data.userName, surname: data.surname };

      const noChanged = deepEqual(currentData, dataInfo);

      if (!noChanged) {
        await changeInfo(dataInfo);
        await refetch();
        dispatch(articlesApi.util.invalidateTags(['Author']));
        dispatch(searchApi.util.invalidateTags(['Author']));

        setShowInputs(['']);
        setErrorMessage('');
        return;
      }
      setErrorMessage('Data has not been changed');
    }
  };

  const showInputHandler = (value: string) => {
    setShowInputs((prev) => [...prev, value]);
  };

  const cancelhandler = (value: 'name' | 'userName' | 'surname') => {
    setShowInputs((prev) => [...prev.filter((name) => name !== value)]);

    setValue(value, data?.[value]);
  };
  return (
    <StyledFormWrapper>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        {!showInputs.includes('userName') ? (
          <TextInfoContainer>
            <TextInfo>{data?.userName}</TextInfo>
            <Button
              variant='contained'
              onClick={() => showInputHandler('userName')}
            >
              Edit
            </Button>
          </TextInfoContainer>
        ) : (
          <TextInfoContainer>
            <Controller
              control={control}
              name='userName'
              render={({ field, fieldState }) => (
                <InputComponent
                  type='text'
                  errorMessage={fieldState.error?.message}
                  value={field.value || ''}
                  onChange={field.onChange}
                  placeholder='Enter the username...'
                  icon={<AccountCircleOutlinedIcon />}
                />
              )}
            />
            <ButtonCancel
              variant='contained'
              onClick={() => cancelhandler('userName')}
            >
              Cancel
            </ButtonCancel>
          </TextInfoContainer>
        )}

        {!showInputs.includes('name') ? (
          <TextInfoContainer>
            <TextInfo>{data?.name}</TextInfo>
            <Button
              variant='contained'
              onClick={() => showInputHandler('name')}
            >
              Edit
            </Button>
          </TextInfoContainer>
        ) : (
          <TextInfoContainer>
            <Controller
              control={control}
              name='name'
              render={({ field, fieldState }) => (
                <InputComponent
                  type='text'
                  errorMessage={fieldState.error?.message}
                  value={field.value || ''}
                  onChange={field.onChange}
                  placeholder='Enter the name...'
                  icon={<AccountCircleOutlinedIcon />}
                />
              )}
            />
            <ButtonCancel
              variant='contained'
              onClick={() => cancelhandler('name')}
            >
              Cancel
            </ButtonCancel>
          </TextInfoContainer>
        )}

        {!showInputs.includes('surname') ? (
          <TextInfoContainer>
            <TextInfo>{data?.surname}</TextInfo>
            <Button
              variant='contained'
              onClick={() => showInputHandler('surname')}
            >
              Edit
            </Button>
          </TextInfoContainer>
        ) : (
          <TextInfoContainer>
            <Controller
              control={control}
              name='surname'
              render={({ field, fieldState }) => (
                <InputComponent
                  type='text'
                  errorMessage={fieldState.error?.message}
                  value={field.value || ''}
                  onChange={field.onChange}
                  placeholder='Enter the surname...'
                  icon={<AccountCircleOutlinedIcon />}
                />
              )}
            />
            <ButtonCancel
              variant='contained'
              onClick={() => cancelhandler('surname')}
            >
              Cancel
            </ButtonCancel>
          </TextInfoContainer>
        )}
        {error && 'data' in error ? <ErrorText>{error.data as string}</ErrorText> : null}
        {errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null}
        {!isLoading ? (
          <Button
            type='submit'
            variant='outlined'
            sx={{
              textTransform: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '22px',
              fontFamily: 'Roboto',
              fontWeight: 500,
            }}
          >
            <AccountCircleOutlinedIcon />
            <span>Change your info</span>
          </Button>
        ) : (
          <CircularProgress />
        )}
      </StyledForm>
    </StyledFormWrapper>
  );
};
