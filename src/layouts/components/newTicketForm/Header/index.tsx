import { Box, Typography } from '@mui/material'
import React, { ReactNode } from 'react'

interface FormsHeaderProps {
  title: string
  children: ReactNode
}
const FormsHeader: React.FC<FormsHeaderProps> = ({ title, children }) => {
  return (
    <>
      <Box>
        <Typography my={'12px'} variant='h6' color={'secondary'}>
          {title}
        </Typography>
        <Box>{children}</Box>
      </Box>
    </>
  )
}

export default FormsHeader
