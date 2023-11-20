import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#e3695c',
    },
    secondary: {
      main: '#a7a9aa',
      light: '#fafbfb',
      dark: '#555d5a'
    },
    info: {
      main: '#292e2f'
    },
    success: {
      main: '#549594'
    }
  }
})

export default theme
