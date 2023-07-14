'use client'

import {FC, useCallback} from 'react'
import {Add} from '@mui/icons-material'
import {Fab, Paper} from '@mui/material'
import {useRouter} from 'next/navigation'
import {SnippetTable} from './snippetTable'

const SnippetsPage: FC = () => {
  const router = useRouter()

  const handleCreateClick = useCallback(() => router.push('/snippets/create'), [router])

  return (
    <>
      <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
        <SnippetTable/>
      </Paper>
      <Fab color="primary" aria-label="add" onClick={handleCreateClick}>
        <Add/>
      </Fab>
    </>
  )
}

export default SnippetsPage