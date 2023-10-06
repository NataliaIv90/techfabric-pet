import { FC } from 'react';
import { AvatarContainer, AvatarAuthorStyled, TextAvatar, DateText, AuthorInfo } from './Author.styled';
import { dateFormater } from '../../utils/dateFormater';
import { IAuthor } from '../../../types/article';

interface IAuthorProps {
  author?: IAuthor;
  datePublished?: string;
  type?: 'comment' | 'search';
}

export const Author: FC<IAuthorProps> = ({ author = { name: '', surname: '' }, datePublished, type }) => {
  const date = dateFormater(datePublished);

  return (
    <>
      <AvatarContainer>
        {author?.avatar ? (
          <AvatarAuthorStyled
            alt='avatar'
            src={`data:${author?.avatar?.contentType};base64,${author?.avatar?.image}`}
          />
        ) : (
          <AvatarAuthorStyled>{author?.name[0]}</AvatarAuthorStyled>
        )}
        <AuthorInfo type={type}>
          <TextAvatar type={type}>
            {author?.name.length <= 10 ? author.name : author.name.slice(0, 10) + '...'}
          </TextAvatar>
          <TextAvatar type={type}>
            {author?.surname.length <= 10 ? author.surname : author.surname.slice(0, 10) + '...'}
          </TextAvatar>
        </AuthorInfo>
      </AvatarContainer>
      {type !== 'search' ? (
        <DateText
          type={type}
        >{`Date: ${date?.month} ${date?.day}, ${date?.year}, ${date?.hours}:${date?.minutes}`}</DateText>
      ) : null}
    </>
  );
};
