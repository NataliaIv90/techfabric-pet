import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarList, StyledTextButton, AdminMenu, StyledSubtitle } from './SidebarNav.styled';
import {
  HomeOutlined,
  TagOutlined,
  FavoriteBorderOutlined,
  EmailOutlined,
  Assignment,
  FormatListBulleted,
} from '@mui/icons-material';
import { UserRole } from '../../../pages/AuthorizedSection';
import { useGetCurrentUserData } from '../../hooks/useGetCurrentUserData';

const sidebarBtnsProps = {
  main: [
    { icon: <HomeOutlined />, text: 'Home Page', path: 'articles', active: true },
    { icon: <TagOutlined />, text: 'Tags', path: 'search?query=+&category=tags', active: false },
    { icon: <FavoriteBorderOutlined />, text: 'Favorites', path: 'favorites', active: false },
  ],
  other: [
    { icon: <EmailOutlined />, text: 'Contact Us', path: 'contact' },
    { icon: <Assignment />, text: 'Rules', path: 'rules' },
  ],
  admin: [
    { icon: <FormatListBulleted />, text: 'Users List', path: 'edit-userList' },
    { icon: <FormatListBulleted />, text: 'Articles List', path: 'edit-articleList' },

  ]
};


export const SidebarNavigation = () => {
  const navigate = useNavigate();
  const { data: userData } = useGetCurrentUserData();
  const location = useLocation();
  const activeHomeBtn = location.pathname === '/articles';

  return (
    <div>
      <SidebarList>
        {sidebarBtnsProps.main.map(({ icon, text, path, active }, index) => {
          if (text === 'Favorites' && !userData) {
            return null;
          }
          return (
            <StyledTextButton
              disableRipple
              key={index}
              onClick={() => {
                navigate(`/${path}`);
              }}
              active={Number(active && activeHomeBtn)}
            >
              {icon} <span> {text}</span>
            </StyledTextButton>
          );
        })}
      </SidebarList>

      {userData?.role === UserRole.ADMIN ? (
        <AdminMenu>
          <StyledSubtitle>Admin Menu</StyledSubtitle>
          {sidebarBtnsProps.admin.map(({ icon, text, path }, index) => (
            <StyledTextButton
              disableRipple
              key={index}
              onClick={() => {
                navigate(`/${path}`);
              }}
            >
              {icon} <span> {text}</span>
            </StyledTextButton>
          ))}
        </AdminMenu>
      ) : null}

      <div>
        <StyledSubtitle>Other</StyledSubtitle>
        <SidebarList>
          {sidebarBtnsProps.other.map(({ icon, text, path }, index) => (
            <StyledTextButton
              disableRipple
              key={index}
              onClick={() => {
                navigate(`/${path}`);
              }}
            >
              {icon} <span> {text}</span>
            </StyledTextButton>
          ))}
        </SidebarList>
      </div>
    </div>
  );
};
