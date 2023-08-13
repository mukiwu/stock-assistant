import React from 'react'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'

const Page = () => {
  return (
    <>
      <h1>Hello, Home page</h1>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </>
  )
}

export default Page
