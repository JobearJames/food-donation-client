import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import Foods from '../components/Foods'
import Map from '../components/Map'
function AvailableFoodScreen() {
  return (
    <Container>
      <Typography variant='h5' sx={{mb:'16px'}}>Available Foods</Typography>
      <Grid container rowGap='16px' justifyContent={'center'}>
        <Grid item xs={12}>
          <Map />
        </Grid>
        <Grid item xs={12}>
          <Foods />
        </Grid>
      </Grid>
    </Container>
  )
}

export default AvailableFoodScreen