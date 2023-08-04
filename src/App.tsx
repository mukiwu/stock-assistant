import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: '#cfe8fc' }}>
          <button onClick={() => setCount(count + 1)}>Click me</button>
          <p>You clicked {count} times</p>
        </Box>
      </Container>
    </>
  )
}

export default App
