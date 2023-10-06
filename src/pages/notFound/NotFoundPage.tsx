import image from '../../assets/images/3828537.jpg';

import { ButtonStyledHome, NotFoundContainer, NotFoundContent, NotFoundImage } from './NotFoundPage.styled';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <NotFoundContainer>
      <NotFoundImage
        src={image}
        alt='NotFound'
      />
      <NotFoundContent>
        <h1>Sorry, Page Not Found</h1>
        <h2>The page you requested could not be found</h2>
        <ButtonStyledHome
          variant='outlined'
          onClick={() => navigate('articles')}
        >
          Go home
        </ButtonStyledHome>
      </NotFoundContent>
    </NotFoundContainer>
  );
};
