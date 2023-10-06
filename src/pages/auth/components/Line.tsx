import { StyledLabelLine, StyledLabelTextContainer } from '../authWrapper/AuthWrapper.styled';
import { Box, Typography } from '@mui/material';
import { FC } from 'react';

interface ILinedTextProps {
  text: string;
}

export const LinedText: FC<ILinedTextProps> = ({ text }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <StyledLabelLine></StyledLabelLine>
      <StyledLabelTextContainer>
        <Typography sx={{
          backgroundColor: '#fff',
          padding: '0 10px',
          zIndex: '2',
          fontSize: '16px',
        }}>{text}</Typography>
      </StyledLabelTextContainer>
    </Box>
  );
};
