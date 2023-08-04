import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import hero_image from '../assets/donation_box.jpg'
import { Stack } from '@mui/system'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
function Hero() {
    const navigate = useNavigate()
    const titleStyle = {
        p: { xs: '1rem', sm: '1.5rem' },
        fontWeight: '600',
        mb: '20px',
        lineHeight: {sm:'72px'},
        color: '#333',
    }
    return (
        <Grid container>
            <Grid item md={6} display={{ md: 'none' }}>
                <img style={{ width: '100%', height: '100%' }} src={hero_image} alt='Food donation' />
            </Grid>
            <Grid item md={6}>
                <Stack justifyContent='center' alignItems='center' sx={{ height: '100%' }}>
                    <Typography
                        variant='h4'
                        align='center'
                        sx={titleStyle}>
                        Giving is not just about make a donation.
                        <Typography
                            variant='h4'
                            sx={{...titleStyle, display: { xs: 'none', sm: 'inline' } }}
                            component={'span'}><br />It's about making difference
                        </Typography>
                    </Typography>
                    <Button
                        variant='contained'
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => navigate('/donate')}
                    >
                        Donate Food
                    </Button>
                </Stack>
            </Grid>
            <Grid item md={6} display={{ xs: 'none', md: 'block' }}>
                <img style={{ width: '100%', height: '100%' }} src={hero_image} alt='Food donation' />
            </Grid>
        </Grid>
    )
}

export default Hero