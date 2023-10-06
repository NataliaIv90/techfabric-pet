import { useEffect } from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Pagination, PaginationItem, Stack, FormControl, ButtonGroup, CircularProgress } from '@mui/material';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  ArticleListWrapper,
  ArticleListContainer,
  TrendingContent,
  MainSection,
  ArticleListHeader,
  ArticleListHeaderLinks,
  ArticlePerPageButtonsContainer,
  StyledArticlePageButton,
  StyledTextButton,
} from './ArticleList.styled';
import { EArticleRequestOrderProps } from '../../../shared/constants/types';
import { useGetArticleListQueryQuery } from '../../../redux/slicesApi/articlesApi';
import { TopAuthors } from '../topAuthors/TopAuthors';
import { TopTags } from '../topTags/topTags';
import { SidebarNavigation } from '../../../shared/components/sidebarNavigation/SidebarNav';
import { ArticleCard } from '../../../shared/components/articleCard/ArticleCard';
import { scrollToTop } from '../../../shared/utils/scrollToTop';
import { useSearchParams } from 'react-router-dom';

const buttonGroupProp = [
  { filterValue: EArticleRequestOrderProps.ByDate, text: 'Last Articles' },
  { filterValue: EArticleRequestOrderProps.ByLikes, text: 'Top Rated' },
];

const articlesPerPageGroupProp = [{ value: '5' }, { value: '10' }, { value: '15' }];

// const sortOptionsProps = [
//   { value: 'byDate', text: 'Date' },
//   { value: 'byAuthor', text: 'Author' },
//   { value: 'byName', text: 'Name' },
//   { value: 'defaultList', text: 'Default' },
// ];

export const ArticleList = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const params = {
    page: searchParams.get('page') || '1',
    size: searchParams.get('size') || '10',
    order: searchParams.get('order') || EArticleRequestOrderProps.ByDate,
    search: searchParams.get('query'),
    findBy: searchParams.get('category'),
  };
  const { data, error, isLoading, isFetching } = useGetArticleListQueryQuery(params);

  useEffect(() => {
    scrollToTop();
  }, [setSearchParams]);

  return (
    <ArticleListWrapper>
      <SidebarNavigation />
      <MainSection>
        <ArticleListHeader>
          <ArticleListHeaderLinks>
            <ButtonGroup
              variant='text'
              aria-label='text button group'
            >
              {buttonGroupProp.map(({ filterValue, text }) => (
                <StyledTextButton
                  key={filterValue}
                  disableRipple
                  onClick={() =>
                    setSearchParams((prev) => {
                      prev.set('page', '1');
                      prev.set('order', filterValue);
                      return prev.toString();
                    })
                  }
                  small={1}
                  active={Number(params.order === filterValue)}
                >
                  {text}
                </StyledTextButton>
              ))}
            </ButtonGroup>
          </ArticleListHeaderLinks>

          <FormControl sx={{ width: '160px' }}>
            {/* <Select
              variant='standard'
              sx={{
                fontSize: '15px',
                fontWeight: 500,
              }}
              disableUnderline
              value={sort}
              onChange={(event: SelectChangeEvent) => {
                setSort(event.target.value as EArticleSortOptions);
              }}
              IconComponent={ArrowForwardOutlined}
            >
              {sortOptionsProps.map(({ value, text }) => (
                <StyledMenuItem
                  key={value}
                  value={value}
                >
                  Sort by {text}
                </StyledMenuItem>
              ))}
            </Select> */}
          </FormControl>
        </ArticleListHeader>
        <ArticleListContainer>
          {isLoading || isFetching ? (
            <div>
              <CircularProgress />
            </div>
          ) : (
            <>
              {data?.articles && Array.isArray(data.articles)
                ? data.articles.map((article) => (
                    <ArticleCard
                      data={article}
                      key={article.id}
                    />
                  ))
                : null}

              {data?.totalPages ? (
                <Stack spacing={2}>
                  <Pagination
                    count={Number(data.totalPages) || 1}
                    page={Number(data.currentPage) || 1}
                    onChange={(e, nextPage) =>
                      setSearchParams((prev) => {
                        prev.set('page', nextPage.toString());
                        return prev.toString();
                      })
                    }
                    variant='outlined'
                    shape='rounded'
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{ previous: ArrowBack, next: ArrowForward }}
                        {...item}
                      />
                    )}
                  />
                </Stack>
              ) : null}

              <ArticlePerPageButtonsContainer>
                <p>Articles per page: </p>
                {articlesPerPageGroupProp.map(({ value }) => (
                  <StyledArticlePageButton
                    key={value}
                    disableRipple
                    onClick={() =>
                      setSearchParams((prev) => {
                        prev.set('page', '1');
                        prev.set('size', value);
                        return prev.toString();
                      })
                    }
                    active={Number(value === params.size)}
                  >
                    {value}
                  </StyledArticlePageButton>
                ))}
              </ArticlePerPageButtonsContainer>
            </>
          )}

          {error ? <div>Something went wrong... Try to update the page...</div> : null}
        </ArticleListContainer>
      </MainSection>

      <TrendingContent>
        <TopTags />
        <TopAuthors />
      </TrendingContent>
    </ArticleListWrapper>
  );
};
