import { useGetTopAuthorsQuery } from '../../../redux/slicesApi/articlesApi';
import { Avatar, CircularProgress } from '@mui/material';
import { TopAuthorItem, AuthorIcon, AuthorName } from './TopAuthors.styled';
import { TopContentWrapper } from '../topContentWrapper/TopContentWrapper';
import { NavLink } from 'react-router-dom';

export const TopAuthors = () => {
  const { data, isLoading } = useGetTopAuthorsQuery();

  return (
    <TopContentWrapper text='Authors'>
      <>
        {isLoading ? <CircularProgress /> : null}

        {data && Array.isArray(data)
          ? data.map(({ name, surname, userName, avatar }, index: number) => (
              <NavLink
                to={`/articles?query=${userName}&category=username`}
                key={index}
              >
                <TopAuthorItem>
                  {!avatar ? (
                    <AuthorIcon>{name[0]}</AuthorIcon>
                  ) : (
                    <Avatar
                      sx={{ width: 48, height: 48 }}
                      alt='avatar'
                      src={`data:${avatar?.contentType};base64,${avatar?.image}`}
                    />
                  )}
                  <AuthorName>
                    <span>{name}</span>
                    <span>{surname}</span>
                  </AuthorName>
                </TopAuthorItem>
              </NavLink>
            ))
          : null}
      </>
    </TopContentWrapper>
  );
};
