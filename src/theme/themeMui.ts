import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    black: true;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    mainColor: string;
    secondaryBlack: string;
    mainBlack: string;
    additionalDark: string;
    accentColor: string;
    accentColorLight: string;
    mainGrey: string;
    strokeGrey: string;
    errorColor: string;
  }

  interface PaletteOptions {
    mainColor?: string;
    secondaryBlack?: string;
    mainBlack?: string;
    additionalDark?: string;
    accentColor?: string;
    accentColorLight?: string;
    mainGrey?: string;
    strokeGrey?: string;
    errorColor?: string;
  }
}

export const themeMui = createTheme({
  typography: {
    fontFamily: '"Archivo", sans-serif',
  },
  palette: {
    mainColor: '#FFFFFF',
    secondaryBlack: '#F5F5F5',
    mainBlack: '#060606',
    additionalDark: '#242424',
    accentColor: '#2190CF',
    accentColorLight: '#e0f4ff',
    mainGrey: '#676767',
    strokeGrey: '#D4D4D4',
    errorColor: '#EA0000',
  },
  transitions: {
    easing: {
      easeOut: '0.3s ease-out',
    },
  },
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          width: '100%',
          border: 'none',
          textTransform: 'none',
          padding: '10px 16px',
          fontSize: '15px',
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: '24px',
          color: '#242424',
          transition: '0.3s ease-out',
          '&:hover': {
            backgroundColor: '#e0f4ff',
            color: '#2190CF',
          },
          '&:focus': {
            backgroundColor: '#e0f4ff',
            color: '#2190CF',
          },
          '&.Mui-selected': {
            fontWeight: '800',
            color: '#2190CF',
            backgroundColor: '#e0f4ff',
            '&:hover': {
              backgroundColor: '#e0f4ff',
              color: '#2190CF',
            },
            '&:focus': {
              backgroundColor: '#e0f4ff',
              color: '#2190CF',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 16px',
          fontSize: '15px',
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: '24px',
        },
      },
      variants: [
        {
          props: { variant: 'black' },
          style: {
            color: '#FFFFFF',
            transition: '0.3s ease-out',
            backgroundColor: '#242424',

            '&:hover': {
              backgroundColor: '#060606',
              color: '#FFFFFF',
            },
            '&:focus': {
              backgroundColor: '#060606',
              color: '#FFFFFF',
            },
          },
        },
        {
          props: { variant: 'text' },
          style: {
            color: '#242424',
            transition: '0.3s ease-out',
            '&:hover': {
              backgroundColor: '#e0f4ff',
              color: '#2190CF',
            },
            '&:focus': {
              backgroundColor: '#e0f4ff',
              color: '#2190CF',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: '#2190CF',
            borderColor: '#2190CF',
            transition: '0.3s ease-out',
            '&:hover': {
              backgroundColor: '#2190CF',
              color: '#FFFFFF',
            },
            '&:focus': {
              backgroundColor: '#2190CF',
              color: '#FFFFFF',
            },
          },
        },
      ],
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          margin: '0 auto',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#2190CF',
            borderColor: '#2190CF',
            backgroundColor: '#fff',
          },
        },
      },
    },
  },
});
