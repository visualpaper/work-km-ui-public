import { Box, Typography } from '@mui/material'
import { RefObject } from 'react'

export interface FooterProps {
  errorElementRef: RefObject<HTMLDivElement>
}

export const Footer: React.FC<FooterProps> = ({ errorElementRef }) => {
  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="row"
      sx={{ backgroundColor: '#AAAAAA' }}
    >
      <Typography variant="body1" ref={errorElementRef}>
        error 領域(初期値)
      </Typography>
    </Box>
  )
}
