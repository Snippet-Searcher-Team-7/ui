'use client'

import {FC} from 'react'
import Typography from '@mui/material/Typography'
import {CircularProgress, Grid, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material'
import {useQuery} from '@tanstack/react-query'
import {useOperations} from '@/data/operationsContext'
import {SnippetRow} from '@/app/snippets/snippetRow'

export const SnippetTable: FC = () => {

  const {snippetOperations} = useOperations()
  const {data: snippets, isFetching} = useQuery(['snippets', 'descriptors'], snippetOperations.listSnippetDescriptors)

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Snippets
      </Typography>
      {isFetching ? (
        <Grid container justifyContent="center">
          <Grid item xs={1}>
            <CircularProgress/>
          </Grid>
        </Grid>
      ) : (
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Conformance</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {snippets && snippets.map((snippet) => (
              <SnippetRow key={snippet.id} snippet={snippet}/>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}