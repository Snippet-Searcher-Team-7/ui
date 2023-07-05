'use client'

import React, {FC, useCallback} from 'react'
import {useOperations} from '@/data/operationsContext'
import {useMutation, useQuery} from '@tanstack/react-query'
import {CircularProgress, Grid, Paper, Typography} from '@mui/material'
import {EditSnippetForm} from '@/app/snippets/edit/[id]/editSnippetForm'
import {UpdateSnippet} from '@/data/snippet'
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
  const {
    mutate,
    isLoading
  } = useMutation(['snippets', 'full', id], (updateSnippet: UpdateSnippet) => snippetOperations.updateSnippetById(id, updateSnippet))

  const handleUpdate = useCallback((updateSnippet: UpdateSnippet) => {
    mutate(updateSnippet)
    router.push(`/snippets/view/${id}`)
  }, [id, mutate, router])

  const handleCancel = useCallback(() => {
    router.push(`/snippets/view/${id}`)
  }, [id, router])

  return (
    <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
      <Typography component="h1" variant="h4" align="center">
        Edit {snippet?.name}
      </Typography>
      {isFetching || isLoading ? (
        <Grid container justifyContent="center">
          <Grid item xs={1}>
            <CircularProgress/>
          </Grid>
        </Grid>
      ) : snippet !== undefined && (
        <EditSnippetForm snippet={snippet} onUpdate={handleUpdate} onCancel={handleCancel}/>
      )}
    </Paper>
  )
}

export default CreateSnippetPage