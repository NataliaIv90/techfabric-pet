import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Pagination, PaginationItem } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';
import { PageButton, PaginationContainer, PerPageButtonsContainer } from './Pagination.styled';
import { scrollToTop } from '../../utils/scrollToTop';

const articlesPerPageGroupProp = [{ value: 5 }, { value: 10 }, { value: 15 }];

interface IController {
  page: number;
  size: number;
}

interface IPaginationProps {
  controller: IController;
  chnageController: React.Dispatch<React.SetStateAction<IController>>;
  totalPages: number;
}

export const PaginationComponent = ({ controller, chnageController, totalPages }: IPaginationProps) => {
  const handlePageChange = useCallback(
    (event: ChangeEvent<unknown>, value: number) => {
      chnageController((prev) => {
        return { ...prev, page: value };
      });
      scrollToTop();
    },
    [chnageController]
  );
  const handlePerPageChange = useCallback(
    (value: number) => {
      chnageController((prev) => {
        return { ...prev, size: value, page: 1 };
      });
      scrollToTop();
    },
    [chnageController]
  );

  return (
    <PaginationContainer>
      <Pagination
        count={totalPages || 1}
        page={controller.page}
        onChange={handlePageChange}
        variant='outlined'
        shape='rounded'
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBack, next: ArrowForward }}
            {...item}
          />
        )}
      />
      <PerPageButtonsContainer>
        <p>Articles per page: </p>
        {articlesPerPageGroupProp.map(({ value }) => (
          <PageButton
            key={value}
            disableRipple
            onClick={() => handlePerPageChange(value)}
            active={Number(value === controller.size)}
          >
            {value}
          </PageButton>
        ))}
      </PerPageButtonsContainer>
    </PaginationContainer>
  );
};
