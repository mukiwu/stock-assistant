import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#e3695c',
      dark: '#292e2f'
    },
    secondary: {
      main: '#549594'
    },
    error: {
      main: '#a7a9aa'
    },
    warning: {
      main: '#fafbfb'
    },
    info: {
      main: '#555d5a'
    }
  }
})

export default theme
