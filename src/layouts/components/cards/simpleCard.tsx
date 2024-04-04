import { Box, Card, CardContent, Skeleton, Typography, useTheme } from '@mui/material'
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'

function SimpleCard({ count, icon, loading, text, iconColor }: any) {
  const theme = useTheme()

  const textColor = theme.palette.mode === 'dark' ? 'common.white' : 'common.black'
  if (loading)
    return (
      <>
        <Skeleton width={'100%'} height={'100%'} />
      </>
    )

  return (
    <>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant='body1' color={textColor} sx={{ mr: 2 }}>
              {text || ''}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'primary' } }}>
              <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4 }} color={iconColor}>
                <Icon icon={icon} fontSize='30px' />
              </CustomAvatar>
            </Box>
          </Box>
          <Typography variant='h5' sx={{ mr: 1.75 }}>
            {count || 0}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default SimpleCard
