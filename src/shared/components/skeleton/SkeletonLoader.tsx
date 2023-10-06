import Typography, { TypographyProps } from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { Box, Stack } from '@mui/material';

export enum ESkeletonTypes {
  List = 'list',
  Article = 'article'
}

const listVariants = [
  'h1',
  'h3',
  'h3',
  'h3',
] as readonly TypographyProps['variant'][];

export const SkeletonLoader = (props: { loading?: boolean, type: ESkeletonTypes }) => {
  const { loading = false, type = ESkeletonTypes.List } = props;

  return (
    <div>
      {type === ESkeletonTypes.List
        ? listVariants.map((variant, index) => (
          <Typography component="div" key={index} variant={variant}>
            {loading ? <Skeleton /> : variant}
          </Typography>
        ))
        : <Stack spacing={1} width='90%' margin='0 auto'>
          <Skeleton variant="rounded" width='100%' height='100px' />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr 5fr' }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </Box>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width='80%' />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width='60%' />
        </Stack>}
    </div>
  );
}
