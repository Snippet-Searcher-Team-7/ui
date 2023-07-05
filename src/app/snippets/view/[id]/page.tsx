'use client'

import React, {FC, useCallback} from 'react'
import {useOperations} from '@/data/operationsContext'
import {useQuery} from '@tanstack/react-query'
import {Box, Button, CircularProgress, Grid, Paper, Typography} from '@mui/material'
import CodeMirror from '@uiw/react-codemirror'
import {javascript} from '@codemirror/lang-javascript'
import {useRouter} from 'next/navigation'

type CreateSnippetPageProps = {
  params: {
    id: string
  }
}

const CreateSnippetPage: FC<CreateSnippetPageProps> = ({params}) => {
  const id: string = params.id

  const router = useRouter()

  const {snippetOperations} = useOperations()
  const {data: snippet, isFetching} = useQuery(['snippets', 'full', id], () => snippetOperations.getSnippetById(id))

  const handleGoToEdit = useCallback(() => {
    router.push(`/snippets/edit/${id}`)
  }, [id, router])

  const handleGoToSnippets = useCallback(() => {
    router.push(`/snippets`)
  }, [id, router])

  return (
    <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
      <Typography component="h1" variant="h4" align="center">
        {snippet?.name}
      </Typography>
      <Grid container justifyContent="center">
        {isFetching ? (
          <Grid item xs={1}>
            <CircularProgress/>
          </Grid>
        ) : snippet !== undefined && (
          <>
            <Grid item xs={12}>
              <CodeMirror
                value={snippet.content}
                height="500px"
                width="100%"
                extensions={[javascript({typescript: true, jsx: false})]}
                readOnly={true}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button variant="contained" sx={{mt: 3, ml: 1}} onClick={handleGoToEdit}>
                  Go to Edit
                </Button>
                <Button sx={{mt: 3, ml: 1}} onClick={handleGoToSnippets}>
                  Go to Snippets
                </Button>
              </Box>
            </Grid>
          </>
        )}

      </Grid>

    </Paper>
  )
}

export default CreateSnippetPage