import { alpha, createTheme } from '@mui/material/styles';
import { common } from '@mui/material/colors';

const palette = {
  background: {
    default: '#FFFFFF',
    paper: 'rgb(98,0,238)'
  },
  primary: {
    main: 'rgb(98,0,238)',
    contrastText: common.white
  },
  secondary: {
    main: common.black,
    contrastText: common.white
  },
  text: {
    primary: '#000',
    secondary: 'rgb(50,50,50)',
    disabled: 'rgb(138,138,138)'
  }
};

const theme = createTheme({
  palette: palette,

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: palette.primary.contrastText,
          '&.Mui-disabled': {
            color: palette.primary.contrastText,
            backgroundColor: alpha(palette.background.paper, 0.2)
          }
        }
      },
      variants: [
        {
          props: { variant: 'text' },
          style: {
            backgroundColor: palette.background.default,
            color: palette.primary.main,
            ':hover': {
              backgroundColor: palette.background.default,
              color: alpha(palette.primary.main, 0.5)
            }
          }
        }
      ]
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%'
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: palette.background.default
        }
      }
    }
  }
});

export default theme;
