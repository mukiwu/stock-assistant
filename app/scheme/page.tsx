import React from 'react'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

export default function Page() {
  return (
    <>
      <h1>Hello, Home page</h1>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Stack spacing={1} alignItems="center">
        <Stack direction="row" spacing={1}>
          <Chip label="primary" color="primary" />
          <Chip label="secondary" color="secondary" />
          <Chip label="secondary light" sx={{ color: 'secondary.light' }} />
          <Chip label="secondary dark" sx={{ color: 'secondary.dark' }} />
          <Chip label="error" color="error" />
          <Chip label="warning" color="warning" />
          <Chip label="info" color="info" />
          <Chip label="success" color="success" />
        </Stack>
        <Stack direction="row" spacing={1}>
          <Chip label="primary" color="primary" variant="outlined" />
          <Chip label="secondary" color="secondary" variant="outlined" />
          <Chip label="secondary light" sx={{ color: 'secondary.light' }} variant="outlined" />
          <Chip label="secondary dark" sx={{ color: 'secondary.dark' }} variant="outlined" />
          <Chip label="error" color="error" variant="outlined" />
          <Chip label="warning" color="warning" variant="outlined" />
          <Chip label="info" color="info" variant="outlined" />
          <Chip label="success" color="success" variant="outlined" />
        </Stack>
      </Stack>
    </>
  )
}