import { useNavigate } from 'react-router-dom';
import { AuthWrapperComponent } from '../authWrapper/AuthWrapper';
import { Button } from '@mui/material';

export const ConfirmedRegistration = () => {
  const navigate = useNavigate();
  return (
    <AuthWrapperComponent
      title='Registration confirmed'
      text='Thank you, your registration has been successfully confirmed!'
    >
      <Button
        variant='outlined'
        type='submit'
        sx={{ textTransform: 'none' }}
        onClick={() => {
          navigate('/login');
        }}
      >
        Back to Login In
      </Button>
    </AuthWrapperComponent>
  );
};
