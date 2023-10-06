import { styled } from '@mui/material';
export const CommentItem = styled('li')`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.strokeGrey};
`;

export const CommentContent = styled('p')`
  color: ${({ theme }) => theme.palette.mainBlack};
  margin-top: 12px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  width: 100%;
  word-wrap: break-word;
  text-align: start;
`;
