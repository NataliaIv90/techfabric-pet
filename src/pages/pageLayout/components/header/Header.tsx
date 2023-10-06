import { Button } from '@mui/material';
import { authApi } from '../../../../redux/slicesApi/authSliceApi';
import { useDispatch } from 'react-redux';
import { MainLogo } from '../main-logo/MainLogo';
import CloseIcon from '@mui/icons-material/Close';
import {
  CloseButtonStyled,
  HeaderContainerStyled,
  ButtonStyled,
  MainContentContainer,
  ButtonContainerStyled,
  ProfileContainerWithButton,
} from './Header.styled';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserRole } from '../../../AuthorizedSection';
import { Profile } from '../profile/Profile';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { EAuthRoutes } from '../../../../shared/constants/routes';
import { useGetCurrentUserData } from '../../../../shared/hooks/useGetCurrentUserData';
import { SearchForm } from './components/SearchForm';

export const Header = () => {
  const [clearData, setClearData] = useState(false);
  const { data, refetch } = useGetCurrentUserData();

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state && location.state.shouldRefetch) {
      refetch();
      navigate(location.pathname, {});
    }
  }, [location.pathname, location.state, navigate, refetch]);

  useEffect(() => {
    data && setClearData(false);
  }, [data]);

  const logout = useCallback(() => {
    localStorage.removeItem('tokens');
    dispatch(authApi.util.resetApiState());
    setClearData(true);
  }, [dispatch]);

  const showProfile = useMemo(() => {
    switch (data?.role) {
      case UserRole.USER:
        return (
          <Profile
            logout={logout}
            user={data}
          />
        );
      case UserRole.AUTHOR:
      case UserRole.ADMIN:
        return (
          <ProfileContainerWithButton>
            <Button
              variant='outlined'
              onClick={() => navigate('/create-article')}
            >
              Create Post
            </Button>
            <Profile
              logout={logout}
              user={data}
            />
          </ProfileContainerWithButton>
        );
      default:
        return null;
    }
  }, [data, logout, navigate]);

  const showCloseButton = Object.values(EAuthRoutes).some((keyword) => location.pathname.includes(keyword));

  return (
    <HeaderContainerStyled>
      <MainContentContainer>
        <NavLink
          to='articles'
          state={{ shouldRefetch: location.pathname === '/profile' ? true : false }}
        >
          <MainLogo type='black' />
        </NavLink>
        {!showCloseButton ? <SearchForm /> : null}
      </MainContentContainer>

      {showCloseButton ? (
        <CloseButtonStyled
          to='articles'
          state={{ shouldRefetch: location.pathname === '/profile' ? true : false }}
        >
          <span>Close</span> <CloseIcon />
        </CloseButtonStyled>
      ) : data && !clearData ? (
        showProfile
      ) : (
        <ButtonContainerStyled>
          <ButtonStyled onClick={() => navigate('login')}>Login</ButtonStyled>
          <ButtonStyled
            variant='outlined'
            onClick={() => navigate('register')}
          >
            Sign Up
          </ButtonStyled>
        </ButtonContainerStyled>
      )}
    </HeaderContainerStyled>
  );
};
