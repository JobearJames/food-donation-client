import { Button, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import welcomeImage from '../assets/charity-logo-emblems-set_1284-8541.webp'
import React from 'react'

function Welcome() {
    return (
        <Container>
            <Grid container alignItems='center' columnSpacing={6} sx={{p:'96px 0'}}>
                <Grid item md = {6} >
                    <img src={welcomeImage} style={{width:'100%'}} alt=''/>
                </Grid>
                <Grid item md={6}>
                    <Typography variant='h4' sx={{mb:'32px'}}>Welcome To Our Donation Area</Typography>
                    <Typography variant='h6' sx={{mb:'32px'}}>
                        Over 90% of the food distributed by fod banks in the Trussell Trust network is Donated by the puplic - that's why your food donations are absolutly vital to our ability to give everyone referred to us a balanced and nutritious three day supply of food. Without your goodwill, our food banks would really struggle to perate.
                    </Typography>
                    <Button variant='contained'>Read more</Button>
                </Grid>

            </Grid>
        </Container>

    )
}

export default Welcome