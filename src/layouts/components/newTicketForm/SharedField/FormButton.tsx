import React from 'react'
import { Button, CircularProgress, ButtonProps } from '@mui/material'
import { useFormContext } from 'react-hook-form'

interface SubmitButtonProps extends ButtonProps {
  beforeText: string
  afterText: string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ beforeText, afterText, ...props }) => {
  const {
    formState: { isSubmitting }
  } = useFormContext()

  return (
    <Button type='submit' disabled={isSubmitting} {...props}>
      {isSubmitting ? (
        <>
          <CircularProgress sx={{ marginInline: '10px' }} size={24} color='inherit' />
          {afterText}
        </>
      ) : (
        beforeText
      )}
    </Button>
  )
}

export default SubmitButton
