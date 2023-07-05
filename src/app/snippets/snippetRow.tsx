'use client'

import {FC, useCallback} from 'react'
import {TableCell, TableRow} from '@mui/material'
import {SnippetDescriptor} from '@/data/snippet'
import {useRouter} from 'next/navigation'
import EditIcon from '@mui/icons-material/Edit'
import ViewIcon from '@mui/icons-material/Visibility'
import IconButton from '@mui/material/IconButton'

export type SnippetRowType = {
  snippet: SnippetDescriptor
}
export const SnippetRow: FC<SnippetRowType> = ({snippet}) => {
  const router = useRouter()

  const handleView = useCallback(() => {
    router.push(`/snippets/view/${snippet.id}`)
  }, [router, snippet.id])

  const handleEdit = useCallback(() => {
    router.push(`/snippets/edit/${snippet.id}`)
  }, [router, snippet.id])

  return (
    <TableRow key={snippet.id}>
      <TableCell>{snippet.name}</TableCell>
      <TableCell>{snippet.type}</TableCell>
      <TableCell>{snippet.compliance}</TableCell>
      <TableCell>
        <IconButton title='View snippet' onClick={handleView}>
          <ViewIcon />
        </IconButton>
        <IconButton title='Edit snippet' onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}