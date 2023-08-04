import { Button, CircularProgress, Grid, TextField, Typography, useTheme } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { makeRequest } from '../features/request/requestSlice'
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import PlaceIcon from '@mui/icons-material/Place';
import Location from '../components/Location'
function RequestForm() {
    const [motivation, setMotivation] = useState('')
    const { selectedFood } = useSelector(state => state.food)
    const { isLoading } = useSelector(state => state.request)
    const { donor, _id } = selectedFood
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const theme = useTheme()
    const { requestId } = useParams()

    const handleInputChange = (e) => {
        setMotivation(e.target.value)
    }
    useEffect(() => {
        if (Object.keys(selectedFood).length === 0 && !requestId) {
            navigate('/foods')
        }
    }, [selectedFood, navigate, requestId])

    const handleSubmit = (e) => {
        dispatch(makeRequest({ motivation, donor, food: _id }))
            .unwrap()
            .then(() => {
                toast.success('Request sent!')
                navigate('/requests')
            })
            .catch((error) => {
                toast.error(error)
            })
        e.preventDefault()
    }
    console.log(selectedFood)
    return (
        <Container sx={{pb:'2rem'}}>
            <Grid
                container
                sx={{ p: '0' }}
                component='form'
                onSubmit={handleSubmit}
                spacing={1}
                direction='column'
            >
                <Grid item>
                    <Typography variant='h5'>
                        Food Details
                    </Typography>
                </Grid>
                <Grid item container alignItems='center' columnGap='4px'>
                    <LunchDiningIcon sx={{ fontSize: '18px' }} />
                    <Typography variant='subtitle1'>
                        {selectedFood.foodName}
                    </Typography>
                </Grid>
                <Grid item container alignItems='center' columnGap='4px'>
                    <PlaceIcon sx={{ fontSize: '18px' }} />
                    <Typography variant='body1'>
                        {selectedFood.area}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>{selectedFood.address}</Typography>
                </Grid>
                <Grid item>
                    <Location position={selectedFood.location} />
                </Grid>
                <Grid item>
                    <img style={{ width: '100%' }} src={selectedFood?.imageURL} alt='food' />
                </Grid>
                <Grid item sx={{ mt: '16px' }}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        size='small'
                        variant="outlined"
                        onChange={handleInputChange}
                        name='motivation'
                        value={motivation}
                        multiline
                        rows={6}
                        placeholder='What is your motivation'
                    />
                </Grid>
                <Grid item>
                    {
                        isLoading
                            ? <CircularProgress />
                            : <Button type='submit' variant='contained'>Submit</Button>
                    }
                </Grid>
            </Grid>
        </Container>

    )
}

export default RequestForm