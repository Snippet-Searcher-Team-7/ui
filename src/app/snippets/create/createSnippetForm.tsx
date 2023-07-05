import React, {FC} from 'react'
import {CreateSnippet, CreateSnippetSchema, SnippetType} from '@/data/snippet'
import {zodResolver} from '@hookform/resolvers/zod'
import {Box, Button, Grid, MenuItem} from '@mui/material'
import {FormContainer, SelectElement, TextFieldElement} from 'react-hook-form-mui'
import {SnippetFileField} from '@/app/snippets/create/snippetFileField'

const TYPE_OPTIONS = [
  {
    id: 'printscript' as SnippetType,
    label: 'PrintScript',
  }
]

export type CreateSnippetFormProps = {
  onCreate: (createSnippet: CreateSnippet) => void
  onCancel: () => void
}

export const CreateSnippetForm: FC<CreateSnippetFormProps> = ({onCreate, onCancel}) => {
  return (
    <FormContainer
      resolver={zodResolver(CreateSnippetSchema)}
      onSuccess={onCreate}
      onError={errors => console.log(errors)}

    >
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <TextFieldElement
            required
            fullWidth
            id="snippet-name"
            name="name"
            label="Name"
            variant="outlined"
            autoComplete="snippet-name"
          />
        </Grid>
        <Grid item xs={4}>
          <SelectElement
            fullWidth
            id="snippet-type"
            name="type"
            label="Type"
            defaultValue="printscript"
            variant="outlined"
            options={TYPE_OPTIONS}
          >
            <MenuItem value="printscript">PrintScript</MenuItem>
          </SelectElement>
        </Grid>
        <Grid item xs={12}>
          <SnippetFileField/>
        </Grid>
      </Grid>
      <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button sx={{mt: 3, ml: 1}} onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{mt: 3, ml: 1}}
          type="submit"
        >
          Create
        </Button>
      </Box>
    </FormContainer>
  )
}