import { IconButton, Menu, MenuItem } from '@mui/material';
import { ICurrentUserResponse } from '../../../../types/user';
import { AvatarStyled, ProfileContainer, RoleTextStyled, TextStyled } from './Profile.styled';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Profile = ({ user, logout }: { user: ICurrentUserResponse; logout: () => void }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenuItem = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (event.target instanceof HTMLElement) {
        const nameButton = event.target.textContent;
        switch (nameButton) {
          case 'Profile':
            handleClose();
            navigate('profile');
            break;
          case 'Settings':
            handleClose();
            navigate('settings');
            break;
          case 'Exit':
            handleClose();
            logout();
            navigate('login');
            break;

          default:
            break;
        }
      }
    },
    [logout, navigate]
  );

  return (
    <>
      <ProfileContainer>
        <IconButton
          onClick={handleClick}
          size='small'
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open}
        >
          {user.avatar ? (
            <AvatarStyled
              alt='avatar'
              src={`data:${user?.avatar?.contentType};base64,${user?.avatar?.image}`}
            />
          ) : (
            <AvatarStyled>{user.name[0]}</AvatarStyled>
          )}
        </IconButton>
        <div>
          <TextStyled>
            {user.name.length <= 10 ? user.name : user.name.slice(0, 10) + '...'}
            <span>{user.surname.length <= 10 ? user.surname : user.surname.slice(0, 10) + '...'}</span>
          </TextStyled>
          <RoleTextStyled>{user.role}</RoleTextStyled>
        </div>
      </ProfileContainer>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClickMenuItem}>Profile</MenuItem>
        {/* <MenuItem onClick={handleClickMenuItem}>Settings</MenuItem> */}
        <MenuItem onClick={handleClickMenuItem}>Exit</MenuItem>
      </Menu>
    </>
  );
};
