import { createTheme, ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { Box, Stack } from '@mui/system'
import { Typography } from '@mui/material'
import theme from './global.theme.config'

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#ABCDEF'
//     }
//   }
// })

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Stack>
        <Alert severity="error" color="retroDark">This is an error alert — check it out!</Alert>
      </Stack>
      <Stack direction="row" gap={2} alignItems="center" className="m-10">
        <Stack>
          <Button variant="contained" color="retroDark">Retro Dark</Button>
          <Stack direction="row" gap={1}>
            <Stack alignItems="center">
              <Typography variant="body1">Light</Typography>
              <Box sx={{ bgcolor: 'retroDark.light', width: 40, height: 20 }} />
            </Stack>
            <Stack alignItems="center">
              <Typography variant="body1">main</Typography>
              <Box sx={{ bgcolor: 'retroDark.main', width: 40, height: 20 }} />
            </Stack>
            <Stack alignItems="center">
              <Typography variant="body1">dark</Typography>
              <Box sx={{ bgcolor: 'retroDark.dark', width: 40, height: 20 }} />
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Button variant="contained" color="retroRed">Retro Red</Button>
          <Stack direction="row" gap={1}>
            <Stack alignItems="center">
              <Typography variant="body1">Light</Typography>
              <Box sx={{ bgcolor: 'retroRed.light', width: 40, height: 20 }} />
            </Stack>
            <Stack alignItems="center">
              <Typography variant="body1">main</Typography>
              <Box sx={{ bgcolor: 'retroRed.main', width: 40, height: 20 }} />
            </Stack>
            <Stack alignItems="center">
              <Typography variant="body1">dark</Typography>
              <Box sx={{ bgcolor: 'retroRed.dark', width: 40, height: 20 }} />
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Button variant="contained" color="retroGreen">Retro Green</Button>
          <Stack direction="row" gap={1}>
            <Stack alignItems="center">
              <Typography variant="body1">Light</Typography>
              <Box sx={{ bgcolor: 'retroGreen.light', width: 40, height: 20 }} />
            </Stack>
            <Stack alignItems="center">
              <Typography variant="body1">main</Typography>
              <Box sx={{ bgcolor: 'retroGreen.main', width: 40, height: 20 }} />
            </Stack>
            <Stack alignItems="center">
              <Typography variant="body1">dark</Typography>
              <Box sx={{ bgcolor: 'retroGreen.dark', width: 40, height: 20 }} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  )
}

export default App
