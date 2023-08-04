import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { Container } from '@mui/material'
import React from 'react'
import food from '../assets/food.jpg'
import money from '../assets/money.jpg'
import clothes from '../assets/cloths.jpg'

const cardData = [
  {
    title: "Food donation",
    image: food,
    description: "Here you can donate your waste or extra food for save food waste and also save hungry people"
  },
  {
    title: "Clothes donation",
    image: clothes,
    description: "Here you can donate your waste or extra food for save food waste and also save hungry people"
  },
  {
    title: "Money donation",
    image: money,
    description: "Here you can donate your waste or extra food for save food waste and also save hungry people"
  },
]
function Services() {
  return (
    <Container>
      <Grid container sx={{ p: '42px 0' }}>
        <Grid item xs={12}>
          <Typography align='center' variant='h4' sx={{ mb: '42px' }}>Other Service Area</Typography>
        </Grid>
        <Grid item container spacing={6}>
          {
            cardData.map(element => (
              <Grid key={element.title} item md={4}>
                <Paper>
                  <img src={element.image} alt='food_image' style={{ width: '100%', height: '300px', borderRadius: '4px 4px 0 0' }} />
                  <Box sx={{p:'16px'}}>
                    <Typography sx={{mb:'8px'}} variant='h6'>{element.title}</Typography>
                    <Typography sx={{mb:'16px'}} variant='body1'>{element.description}</Typography>
                    <Button variant='contained' size='small'>Donate Here</Button>
                  </Box>
                </Paper>
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    </Container>
  )
}

export default Services