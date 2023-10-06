import { useCallback, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, Paper, TableHead, Stack, Pagination, PaginationItem, Button, } from '@mui/material';
import { SidebarNavigation } from '../../shared/components/sidebarNavigation/SidebarNav';
import { ArrowBack, ArrowForward, Delete, Sync } from '@mui/icons-material';
import { ContentContainer, Main, StyledTitle, ArticlesListContainer, PaginationContainer, StyledListHeaderContainer, RefreshButton, ArticleTitle, ArticleImagePreview, StyledTableRow } from './EditArticlesList.styled';
import { scrollToTop } from '../../shared/utils/scrollToTop';
import { NavLink, useSearchParams } from 'react-router-dom';
import { EArticleRequestOrderProps } from '../../shared/constants/types';
import { useDeleteArticleMutation, useGetArticleListQueryQuery } from '../../redux/slicesApi/articlesApi';
import { dateFormater } from '../../shared/utils/dateFormater';
import { ConfirmationModal } from '../../shared/components/modal/confirmationModal/Modal';
import { NotificationModal } from '../../shared/components/modal/notificationModal/Modal';
import { SkeletonLoader, ESkeletonTypes } from '../../shared/components/skeleton/SkeletonLoader';

export const EditArticleList = () => {
  scrollToTop();
  const [open, setOpen] = useState<boolean>(false);
  const [errorNotification, setErrorNotification] = useState<boolean>(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  let [searchParams, setSearchParams] = useSearchParams();
  const params = {
    page: searchParams.get('page') || '1',
    size: searchParams.get('size') || '10',
    order: searchParams.get('order') || EArticleRequestOrderProps.ByDate,
    search: searchParams.get('query'),
    findBy: searchParams.get('category'),
  };
  const [deleteArticle, { isSuccess: deleteSuccess, error: deleteError, isLoading: isDeleting }] = useDeleteArticleMutation();
  const { data, error, isLoading, isFetching, refetch } = useGetArticleListQueryQuery(params);

  const handleOpen = useCallback((id: string) => {
    setArticleToDelete(id);
    setOpen(true);
  }, [setArticleToDelete, setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setArticleToDelete(null);
  }, [setOpen]);

  const deleteCurrentArticle = useCallback(async (articleId: string) => {
    await deleteArticle({ articleId })
      .then(() => { setOpen(false); });
  }, [deleteArticle, deleteError]);

  useEffect(() => {
    scrollToTop();
  }, [setSearchParams]);

  useEffect(() => {
    if (deleteError) {
      setErrorNotification(true);
    }
  }, [deleteError]);

  useEffect(() => {
    if (deleteSuccess) {
      refetch();
    };
  }, [deleteSuccess, refetch]);

  return (
    <ContentContainer>

      <ConfirmationModal
        title='Attention: Article Deletion Warning!'
        text='Please be aware that the selected article will be permanently deleted, and there is no way to recover it.'
        handleClose={handleClose}
        open={open}
        confirmDeleting={() => deleteCurrentArticle(articleToDelete as string)}
        id={articleToDelete}
        isLoading={isDeleting}
      />

      <NotificationModal
        open={errorNotification}
        handleClose={() => { setErrorNotification(false) }}
        text='Oops, unexpected error occured. Check your connection and reload the page.'
      />

      <SidebarNavigation />

      <Main>
        <StyledListHeaderContainer>
          <StyledTitle>Articles List </StyledTitle>
          <RefreshButton onClick={() => refetch()}> <Sync /></RefreshButton>
        </StyledListHeaderContainer>

        {error && 'data' in error
          ? <p>Opps, something went wrong. {JSON.stringify(error.data)}</p>
          : null
        }

        {isLoading || isFetching
          ? <SkeletonLoader loading={isLoading || isFetching} type={ESkeletonTypes.List} />
          : <><ArticlesListContainer>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                aria-label='simple table'
              >
                <TableHead>
                  <StyledTableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Date of publication</TableCell>
                    <TableCell>Edit list</TableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {data?.articles?.map((article) =>
                    <StyledTableRow
                      key={article.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        <NavLink target='_blank' to={`/articles/${article.id}`}>
                          <ArticleTitle>{article.name}</ArticleTitle>
                          <ArticleImagePreview
                            mainImage={article.mainImage}
                            contentType={article.contentType} />
                        </NavLink>
                      </TableCell>
                      <TableCell>{article.description}</TableCell>
                      <TableCell>{article.author.name} {article.author.surname}</TableCell>
                      <TableCell>{dateFormater(article.published)?.day} {dateFormater(article.published)?.month} {dateFormater(article.published)?.year}</TableCell>
                      <TableCell>
                        <Button variant='text' onClick={() => handleOpen(article.id)}>
                          <Delete />
                        </Button>
                      </TableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </ArticlesListContainer>
            <PaginationContainer>
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
            </PaginationContainer>
          </>}
      </Main>
    </ContentContainer >
  );
};
