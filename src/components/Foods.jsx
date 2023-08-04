import { Button, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getFoods, setSelectedFood } from '../features/foods/foodSlice'
import SendIcon from '@mui/icons-material/Send';
import Loader from './Loader'
import { Stack } from '@mui/system'
import { truncate } from '../utils/truncate'

function Foods() {
    const { foods, isLoading } = useSelector(state => state.food)
    const {user} = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(() => {
        dispatch(getFoods())
    }, [dispatch])

    const handleClick = (food) => {
        dispatch(setSelectedFood(food))
        navigate(`/foods/${food._id}`)
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <Grid container spacing={4} sx={{mb: '20px' }}>
            {
                foods.map(food => {
                    if (food.status === 'available') {
                        return (
                            <Grid item xs={12} md={3} key={food._id}>
                                <Paper>
                                    <img
                                        src={food.imageURL}
                                        alt='food'
                                        style={{ width: '100%', height: '200px', borderRadius: '10px 10px 0 0' }}
                                    />
                                    <Stack sx={{p:'16px 8px', rowGap:'4px'}}>
                                        <Typography variant='h6'>{food.foodName}</Typography>
                                        <Typography variant='body2'>{truncate(food.description, 35)}</Typography>
                                        <Typography variant='subtitle1'>{food.area}</Typography>
                                        <Typography variant='subtitle2'>{truncate(food.address, 35)}</Typography>
                                        <Button
                                            sx={{ mt: '8px' }}
                                            variant='contained'
                                            onClick={() => handleClick(food)}
                                            endIcon={food.donor === user._id?null:<SendIcon />}
                                            disabled={food.donor === user._id}
                                        >
                                            {food.donor === user._id?"Your Donated Food":'Make Request'}
                                        </Button>
                                    </Stack>
                                </Paper>
                            </Grid>
                        )
                    } else {
                        return null
                    }
                })
            }
        </Grid>
    )
}

export default Foods