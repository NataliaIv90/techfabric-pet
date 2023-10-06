import { Button, styled } from '@mui/material';

export const NotFoundContainer = styled('div')`
  display: flex;
  justify-content: center;
  gap: 40px;
  height: 60vh;
  margin: 0 auto;
  padding: 50px 140px;
`;

export const NotFoundImage = styled('img')`
  height: 100%;
  border-radius: 8px;
`;
export const NotFoundContent = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
`;

export const ButtonStyledHome = styled(Button)`
  max-width: calc(100% / 2);
`;
