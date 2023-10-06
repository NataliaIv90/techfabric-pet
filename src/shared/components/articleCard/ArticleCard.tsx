import {
  Card,
  ArticleImage,
  AuthorIcon,
  AuthorName,
  ArticleDate,
  ArticleContent,
  ArticleFooter,
  ArticleTitle,
  TagItem,
  ButtonText,
  ArticleInfo,
  ArticleTags,
  LikeBtn,
  ArticleDescription,
  GameDetaiils,
  DetailsTitle,
  DetailsValue,
} from './ArticleCard.styled';
import { FavoriteBorderOutlined, Favorite } from '@mui/icons-material';
import { IArticleCardProps } from '../../../types/article';
import { NavLink } from 'react-router-dom';
import { dateFormater } from '../../utils/dateFormater';
import { useGetCurrentUserData } from '../../hooks/useGetCurrentUserData';
import { useCallback, useState } from 'react';
import { useLikeMutation } from '../../../redux/slicesApi/articlesApi';
import { Avatar } from '@mui/material';

export const ArticleCard = ({
  data: {
    name,
    author,
    published,
    mainImage,
    contentType,
    tags = [],
    id,
    year,
    platform,
    gameType,
    description,
    hasCurrentUserLiked,
  },
}: IArticleCardProps) => {
  const [isLiked, setIsLiked] = useState<boolean | undefined>(hasCurrentUserLiked);
  const [like] = useLikeMutation();
  const datePublished = dateFormater(published);
  const { data: userData } = useGetCurrentUserData();

  const handleLikeBtnClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
      e.stopPropagation();
      like({ id });
      setIsLiked((prev) => !prev);
    },
    [id, like]
  );

  const articleDetailsProps = [
    { title: 'Game type', value: gameType },
    { title: 'Platform', value: platform },
    { title: 'Year', value: year },
  ];

  return (
    <Card>
      <NavLink to={`/articles/${id}`}>
        {mainImage ? (
          <ArticleImage
            mainImage={mainImage}
            contentType={contentType}
          />
        ) : null}
        <ArticleContent>
          <ArticleInfo>
            {!author.avatar ? (
              <AuthorIcon>{author.name[0]}</AuthorIcon>
            ) : (
              <Avatar
                sx={{ width: 48, height: 48 }}
                alt='avatar'
                src={`data:${author.avatar?.contentType};base64,${author.avatar?.image}`}
              />
            )}
            <div>
              <AuthorName>
                {author.name} {author.surname}
              </AuthorName>
              <ArticleDate>{`${datePublished?.month} ${datePublished?.day}, ${datePublished?.year}, ${datePublished?.hours}:${datePublished?.minutes}`}</ArticleDate>
            </div>
          </ArticleInfo>
          <ArticleTitle>{name}</ArticleTitle>
          <ArticleDescription>{description}</ArticleDescription>
          <ArticleInfo>
            {articleDetailsProps.map((el, index) => {
              return el.value ? (
                <GameDetaiils key={index}>
                  <DetailsTitle>{el.title}: </DetailsTitle>
                  <DetailsValue>{el.value}</DetailsValue>
                </GameDetaiils>
              ) : null;
            })}
          </ArticleInfo>
          <ArticleFooter>
            <ArticleTags>
              {tags.map((tag, index) => (
                <TagItem key={index}>{tag.name}</TagItem>
              ))}
            </ArticleTags>
            {userData ? (
              <LikeBtn onClick={handleLikeBtnClick}>
                <ButtonText>{isLiked ? 'Remove from Favorites' : 'Add to Favorites'}</ButtonText>
                {isLiked ? <Favorite /> : <FavoriteBorderOutlined />}
              </LikeBtn>
            ) : null}
          </ArticleFooter>
        </ArticleContent>
      </NavLink>
    </Card>
  );
};
