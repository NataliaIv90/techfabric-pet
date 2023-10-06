import { ChangeEvent, FC, ReactElement } from 'react';
import { Box, TextField, useTheme } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

export interface IInputProps {
  search?: boolean;
  type: 'text' | 'password' | 'email';
  value: string;
  onChange: (newValue: string) => void;
  errorMessage?: string;
  placeholder: string;
  icon?: ReactElement;
  onBlur?: () => void;
}

export const InputComponent: FC<IInputProps> = ({
  value,
  type,
  onChange,
  errorMessage,
  placeholder,
  icon,
  search,
  onBlur,
}) => {
  const theme = useTheme();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Box>
      <TextField
        variant='outlined'
        error={Boolean(errorMessage)}
        type={type}
        value={value}
        sx={{
          borderRadius: '8px',
          border: `2px solid ${theme.palette.strokeGrey})`,
          background: ` ${theme.palette.mainColor}`,
          transition: 'all 0.2s',
          '&:hover': {
            borderColor: theme.palette.additionalDark,
          },
          '&::placeholder': {
            fontWeight: 500,
          },
        }}
        placeholder={placeholder}
        fullWidth
        size='small'
        InputProps={
          !search
            ? {
                startAdornment: icon ? <InputAdornment position='start'>{icon}</InputAdornment> : null,
              }
            : { endAdornment: icon ? <InputAdornment position='end'>{icon}</InputAdornment> : null }
        }
        onChange={handleChange}
        onBlur={onBlur}
      />
      {errorMessage && <Box sx={{ color: `${theme.palette.errorColor}` }}>{errorMessage}</Box>}
    </Box>
  );
};
