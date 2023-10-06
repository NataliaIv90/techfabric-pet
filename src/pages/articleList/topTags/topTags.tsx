import { useGetTopTagsQuery } from '../../../redux/slicesApi/articlesApi';
import { CircularProgress } from '@mui/material';
import { TagItem } from './TopTags.styled';
import { NavLink } from 'react-router-dom';
import { TopContentWrapper } from '../topContentWrapper/TopContentWrapper';

export const TopTags = () => {
  const { data, isLoading } = useGetTopTagsQuery();

  return (
    <TopContentWrapper text='Tags'>
      <>
        {isLoading ? <CircularProgress /> : null}

        {data && Array.isArray(data)
          ? data.map((tag, index) => (
            <NavLink to={`/articles?query=${tag.name.slice(1)}&category=tags`} key={index}>
              <TagItem >{tag.name}</TagItem>
            </NavLink>
          ))
          : null
        }
      </>
    </TopContentWrapper>
  )
}