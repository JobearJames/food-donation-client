import { Grid, Typography, Paper, Button, Stack, IconButton, Container } from '@mui/material'
import { Box } from '@mui/system'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Badge from '../components/Badge'
import Loader from '../components/Loader'
import { deleteFoodById, getUserFoods } from '../features/foods/foodSlice'
import { toast } from 'react-toastify';
import { truncate } from '../utils/truncate';
import AddIcon from '@mui/icons-material/Add';

function DonationListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, userFoods } = useSelector(state => state.food)
    useEffect(() => {
        dispatch(getUserFoods())
    }, [dispatch])

    const handleClick = (foodId) => {
        navigate(`/request/food/${foodId}`)
    }
    const handleDelete = (food) => {
        if (window.confirm("Do you really want to Delete?")) {
            dispatch(deleteFoodById(food._id))
                .unwrap()
                .then(() => {
                    toast.success('Deleted successfully')
                })
                .catch((error) => {
                    toast.error('Something wrong')
                })
        }
    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <Container>
            <Grid container direction='column' rowSpacing={'1rem'}>
                {/* Page title*/}
                <Grid item xs={12}>
                    <Stack direction={'row'} alignItems={'center'} gap={'0.125rem'}>
                        <Typography variant='h5'>
                            All Donations
                        </Typography>
                        <IconButton
                            onClick={() => navigate('/donate')}
                            color="primary"
                            variant='contained'
                        >
                            <AddIcon />
                        </IconButton>
                    </Stack>
                </Grid>

                <Grid item container xs={12} spacing={'2rem'}>
                    {
                        userFoods.map(food => (
                            <Grid item xs={12} sm={6} md={3} key={food._id}>
                                <Paper
                                >
                                    <img
                                        src={food.imageURL}
                                        alt='food'
                                        style={{ height: '200px', width: '100%', borderRadius: '10px 10px 0 0' }}
                                    />
                                    <Stack gap='4px' sx={{ p: '1rem' }}>
                                        <Stack
                                            direction='row'
                                            justifyContent='space-between'
                                            alignItems='center'
                                        >
                                            <Typography variant='h6'>{food.foodName}</Typography>
                                            <Typography variant='body2' sx={{ mb: '4px' }}>
                                                <Badge
                                                    bg={food.status === 'booked' ? 'primary' : 'warning'}
                                                >
                                                    {food.status}
                                                </Badge>
                                            </Typography>
                                        </Stack>
                                        <Typography variant='body1'>{truncate(food.description, 25)}</Typography>
                                        <Typography variant='body2'>{food.area}</Typography>
                                        <Typography variant='subtitle2'>{truncate(food.address, 30)}</Typography>

                                        <Stack direction='column' justifyContent='space-between' sx={{ mt: '8px' }}>
                                            <Box>
                                                <IconButton
                                                    variant='contained'
                                                    color='primary'
                                                    onClick={() => navigate(`/editFood/${food._id}`)}

                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => handleDelete(food)}
                                                    variant='contained'
                                                    color='error'
                                                >
                                                    <DeleteIcon size="large" />
                                                </IconButton>
                                            </Box>
                                            <Button
                                                variant='contained'
                                                size="small"
                                                onClick={() => handleClick(food._id)}
                                                endIcon={<VisibilityIcon fontSize='large' />}
                                            >
                                                Requests
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

export default DonationListScreen