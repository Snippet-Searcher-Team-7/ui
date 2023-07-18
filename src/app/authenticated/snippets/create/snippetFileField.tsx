import React, {ChangeEvent, FC, useCallback, useMemo} from 'react'
import {useFormContext, useFormState} from 'react-hook-form-mui'
import {CreateSnippet} from '@/data/snippet'
import {TextField} from '@mui/material'

export const SnippetFileField: FC = () => {
  const {register, setValue, clearErrors,} = useFormContext<CreateSnippet>()

  const {errors} = useFormState<CreateSnippet>()

  const contentErrors = useMemo(() => errors['content'], [errors])

  const {name, required} = register('content')

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0]
    file.text().then(content => {
      clearErrors('content')
      setValue('content', content)
    })
  }, [clearErrors, setValue])

  return (
    <TextField
      name={name}
      required={required}
      onChange={handleChange}

      error={contentErrors !== undefined}
      helperText={contentErrors?.message}

      type="file"
      label="File"

      fullWidth
      variant="outlined"
    />
  )
}