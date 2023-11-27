import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#E3695C',
    },
    secondary: {
      main: '#A7A9AA',
      light: '#FAFBFB',
      dark: '#555D5A'
    },
    info: {
      main: '#292E2F'
    },
    success: {
      main: '#549594'
    }
  }
})

export default theme
