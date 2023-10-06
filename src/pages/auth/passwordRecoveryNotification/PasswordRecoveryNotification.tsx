import { useNavigate } from 'react-router-dom';
import { AuthWrapperComponent } from '../authWrapper/AuthWrapper';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { scrollToTop } from '../../../shared/utils/scrollToTop';

export const PasswordRecoveryNotification = () => {
  const navigate = useNavigate();
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <AuthWrapperComponent
      title='Password recovery link sent'
      text='We&#39;ve sent a password recovery link to your registered email address. Please check your inbox and follow the instructions to reset your password.&#10;If you don&#39;t see the email in a few minutes, remember to check your spam folder.&#10;Please note that you can use the received link only once. In case of failure, fill out the password recovery form again.'
    >
      <Button
        variant='outlined'
        type='submit'
        onClick={() => {
          navigate('/');
        }}
        sx={{ textTransform: 'none' }}
      >
        Back to the Main page
      </Button>
    </AuthWrapperComponent>
  );
};
