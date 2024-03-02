import { createTheme } from '@mui/material'

export const themeColors = {
  primary: { main: '#DB6F15', hover: '#D67630' },
  secondary: { main: '#FFF' },
  error: { main: '#F80332' },
  warning: { main: '#F80332' },
  success: { main: '#02CF0D' },
  background: {
    main: '#FBFBFB',
    secondary: '#FFFFFF',
    disabled: '#FFFFFF',
    tertiary: '#f6f5f6'
  },
  border: {
    main: '#E9E9E9',
    secondary: '#B9B9B9',
    additional: '#FFFFFF'
  },
  textColor: {
    primary: '#FFF',
    secondary: '#B9B9B9',
    additional: '#FFFFFF',
    disabled: '#FFFFFF'
  }
}

export const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#FFF"
        }
      }
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'unset',
          fontWeight: 500,
          fontSize: 15,
          lineHeight: '26px'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        h5: {
          lineHeight: '110%'
        },
        h4: {
          lineHeight: '110%',
          fontSize: '2rem'
        },
        body2: {
          color: themeColors.textColor.secondary,
          lineHeight: '130%'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 0
        }
      }
    }
  },
  palette: {
    primary: {
      main: themeColors.primary.main,
      dark: themeColors.primary.hover
    },
    secondary: {
      main: themeColors.secondary.main,
    },
    error: {
      main: themeColors.error.main
    },
    warning: {
      main: themeColors.warning.main
    },
    success: {
      main: themeColors.success.main
    },
    text: {
      primary: themeColors.primary.main,
      secondary: themeColors.secondary.main,
    }
  },
  typography: {
    fontFamily: ['Golos Text', 'sans-serif'].join(','),
  }
})
