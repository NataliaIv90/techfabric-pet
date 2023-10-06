import { ArticlePreview, ArticleImage } from './Article.styled';
import './Article.css';
import { TArticleData } from '../../../types/article';

interface IArticleProps extends TArticleData {
  inFullInfo?: boolean;
  hasComments?: boolean;
}

export const Article = ({
  name,
  mainImage,
  tags,
  content,
  inFullInfo,
  year,
  gameType,
  platform,
  hasComments,
}: IArticleProps) => {
  return (
    <div className='Article'>
      <ArticlePreview
        inFullInfo={inFullInfo}
        hasComments={hasComments}
      >
        {mainImage ? <ArticleImage mainImage={mainImage} /> : null}
        <h1>{name}</h1>
        {tags ? <p className='tags'>{tags}</p> : null}
        {platform ? (
          <p>
            <span className='bold'>Platform: </span>
            {platform}
          </p>
        ) : null}
        {gameType ? (
          <p>
            <span className='bold'>Game type: </span>
            {gameType}
          </p>
        ) : null}
        {year ? (
          <p>
            <span className='bold'>Year: </span>
            {year}
          </p>
        ) : null}
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </ArticlePreview>
    </div>
  );
};
