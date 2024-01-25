import { createTheme } from '@mui/material'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    common: true
    presentation: true
    nav: true
    noPresentation: true
  }
}

const theme = createTheme({
  palette: {
    secondary: {
      light: '#DCDFE4',
      main: '#DFE1E6',
      dark: '#44546F',
      contrastText: '#44546F',
      '100': '#fafafa',
      '200': '#DCDFE4',
      '300': '#A4B1B6',
      '500': '#A0AEB3',
      '600': '#DFE1E6',
      '800': '#396174',
      '900': '#44546F'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    subtitle2: {
      fontSize: '12px',
      fontWeight: '400',
      color: '#44546F'
    },
    subtitle1: {
      fontSize: '14px',
      fontWeight: '400',
      color: '#44546F'
    },
    h6: {
      fontSize: '16px',
      fontWeight: '400',
      color: '#44546F'
    },
    h5: {
      fontSize: '18px',
      fontWeight: '500',
      color: '#44546F'
    },
    h4: {
      fontSize: '18px',
      fontWeight: '500',
      textTransform: 'uppercase',
      color: '#44546F'
    }
  },

  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'common' },
          style: {
            textTransform: 'none'
          }
        },
        {
          props: { variant: 'noPresentation' },
          style: {
            color: 'white',
            textTransform: 'none'
          }
        },
        {
          props: { variant: 'presentation' },
          style: {
            backgroundColor: '#DFE1E6',
            color: '#172B4D',
            textTransform: 'none',

            ':hover': {
              backgroundColor: 'white'
            }
          }
        },
        {
          props: { variant: 'presentation', color: 'secondary' },
          style: {
            backgroundColor: '#44546F',
            color: 'white',
            ':hover': {
              backgroundColor: '#DFE1E6',
              color: '#172B4D'
            }
          }
        },
        {
          props: { variant: 'nav' },
          style: {
            color: '#44546F',
            ':hover': {
              backgroundColor: '#DCDFE4'
            }
          }
        },
        {
          props: { variant: 'nav', color: 'secondary' },
          style: {
            color: 'white',
            backgroundColor: '#44546F',
            textTransform: 'inherit',
            padding: '3px 15px',
            ':hover': {
              backgroundColor: '#396174'
            }
          }
        }
      ]
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgb(10 88 165 / 10%)' // Màu sắc khi hover
          }
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: '27px',
          height: '27px',
          fontSize: '14px'
        }
      }
    }
  }
})

export default theme
