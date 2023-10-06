import { useParams } from 'react-router-dom';
import { useSendMailMutation } from '../../../redux/slicesApi/authSliceApi';
import { AuthWrapperComponent } from '../authWrapper/AuthWrapper';
import { Button, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { scrollToTop } from '../../../shared/utils/scrollToTop';

export const RegistrationConfirmation = () => {
  const [sendMail, { isLoading }] = useSendMailMutation();

  const { email } = useParams();
  useEffect(() => {
    scrollToTop();
  }, []);

  const sendMailAgain = () => {
    email && sendMail({ email });
  };

  return (
    <AuthWrapperComponent
      title='Thank you for Registering'
      text='Thank you for registering on the portal! We are sure that together with you we can be even better.&#10;We have sent a letter confirming your registration to the specified email. If you didn&#39;t receive it, please check your spam folder or click the "Send again" button below.'
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Button
          variant='outlined'
          type='submit'
          onClick={sendMailAgain}
          sx={{ textTransform: 'none' }}
        >
          Send mail again
        </Button>
      )}
    </AuthWrapperComponent>
  );
};
