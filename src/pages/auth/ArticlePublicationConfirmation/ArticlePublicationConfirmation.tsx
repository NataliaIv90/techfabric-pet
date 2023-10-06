import { useNavigate } from 'react-router-dom';
import { AuthWrapperComponent } from '../authWrapper/AuthWrapper';
import { Button } from '@mui/material';
import { scrollToTop } from '../../../shared/utils/scrollToTop';

export const ArticlePublicationConfirmation = () => {
  const navigate = useNavigate();
  scrollToTop();

  return (
    <AuthWrapperComponent
      title='Article was Published!'
      text='Great job!&#10;Your article was successfully published. We need some time for it to appear on the site.'
    >
      <Button
        variant='outlined'
        type='submit'
        onClick={() => { navigate('/') }}
        sx={{ textTransform: 'none' }}
      >
        Back to Home Page
      </Button>
    </AuthWrapperComponent>
  );
};
