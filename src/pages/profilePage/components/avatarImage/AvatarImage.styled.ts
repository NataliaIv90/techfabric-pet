import { Avatar, Button, styled } from '@mui/material';

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const AvatarImageContainer = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

export const AvatarProfile = styled(Avatar)`
  width: 150px;
  height: 150px;
  font-size: 60px;
`;

export const ErrorText = styled('p')`
  color: #e4384e;
`;

export const OptionsButtonsContainer = styled('div')`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 16px;
`;

export const ButtonCancel = styled(Button)`
  &:hover {
    border-color: #e4384e;
    background-color: #e4384e;
  }
`;
