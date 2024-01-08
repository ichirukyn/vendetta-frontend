import { createTheme } from '@mui/material'

export const themeColors = {
  primary: { main: '#8652FD', hover: '#A47DFE' },
  secondary: { main: '#1C1C1E' },
  error: { main: '#F80332' },
  warning: { main: '#F80332' },
  success: { main: '#02CF0D' },
  background: {
    main: '#FBFBFB',
    secondary: '#FFFFFF',
    disabled: 'rgba(134, 82, 253, 0.12)',
    tertiary: '#f6f5f6'
  },
  border: { main: '#E9E9E9', secondary: '#B9B9B9', additional: 'rgba(134, 82, 253, 0.5)' },
  textColor: {
    primary: '#1C1C1E',
    secondary: '#B9B9B9',
    additional: '#FFFFFF',
    disabled: 'rgba(134, 82, 253, 0.38)'
  },
  events: {
    pink: '#F7D9FF',
    blue: '#A9EDE0',
    yellow: '#FFEED9',
    individualSportsman: '#F7D9FF',
    individualSportsmanPair: '#A9EDE0',
    individualTrainer: '#FFEEDC',
    groupSportsman: '#A9EDE0',
    groupTrainer: '#DAEDFE',
    tournament: '#E5F4C9',
    trainingCamp: '#C9F4D8',
    groupClubLeader: '#FFEED9'
  }
}

export const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#121123"
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
      main: themeColors.secondary.main
    },
    error: {
      main: themeColors.error.main
    },
    warning: {
      main: themeColors.warning.main
    },
    success: {
      main: themeColors.success.main
    }
  },
  typography: {
    fontFamily: ['Golos Text', 'sans-serif'].join(',')
  }
})
