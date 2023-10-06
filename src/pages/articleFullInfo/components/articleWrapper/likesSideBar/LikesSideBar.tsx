import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { CountSpan, IconButtonStyled, ListIcons } from './LikesSideBar.styled';
import { useArticleById } from '../../../../../shared/hooks/useArticleById';
import { useNavigate, useParams } from 'react-router-dom';
import { useLikeMutation } from '../../../../../redux/slicesApi/articlesApi';
import { useGetCurrentUserData } from '../../../../../shared/hooks/useGetCurrentUserData';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';

const icons = [
  {
    id: 1,
    name: 'favorite',
    icon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '42px' }} />,
  },
  {
    id: 2,
    name: 'comments',
    icon: <CommentOutlinedIcon sx={{ fontSize: '42px' }} />,
  },
];

export const LikesSidebar = ({ scrollToSection }: { scrollToSection: () => void }) => {
  const { data, refetch } = useArticleById();
  const { data: user } = useGetCurrentUserData();
  const [like] = useLikeMutation();
  const [loader, setLoader] = useState(false);
  const { articleId } = useParams();

  const navigate = useNavigate();

  const count = (name: string) => {
    switch (name) {
      case 'favorite':
        return data?.likes;
      case 'comments':
        return data?.comments.length;

      default:
        return 0;
    }
  };
  const handleClick = async (name: string) => {
    switch (name) {
      case 'favorite':
        if (user) {
          setLoader(true);
          await like({ id: articleId || '' });
          await refetch();
          setLoader(false);
        } else {
          navigate('/login');
        }

        break;
      case 'comments':
        if (!data?.comments.length && !user) {
          return;
        }
        scrollToSection();
        break;
      default:
        return;
    }
  };
  return (
    <ListIcons>
      {icons.map(({ id, icon, name }) => (
        <li key={id}>
          <IconButtonStyled
            isLiked={name === 'favorite' && data?.hasCurrentUserLiked}
            onClick={() => handleClick(name)}
          >
            {name === 'favorite' && loader ? <CircularProgress sx={{ fontSize: '42px' }} /> : icon}
            <CountSpan>{count(name)}</CountSpan>
          </IconButtonStyled>
        </li>
      ))}
    </ListIcons>
  );
};
