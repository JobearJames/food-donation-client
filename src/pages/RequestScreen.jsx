import { Box, Button, Container, Grid, Modal, Paper, Rating, Typography } from '@mui/material'
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Badge from '../components/Badge'
import Loader from '../components/Loader'
import { confirmRequest, getRequest } from '../features/request/requestSlice'
import { truncate } from '../utils/truncate';
import { addRating, getRatings } from '../features/rating/ratingSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};

function RequestScreen() {
    const { foodId } = useParams()
    const dispatch = useDispatch()
    const { requests, isLoading } = useSelector((state) => state.request)
    const { ratings, isLoading: isRatingLoading } = useSelector((state) => state.rating)
    const [contactInfo, setContactInfo] = useState({})
    const [open, setOpen] = useState(false)
    const [openDocuments, setOpenDocuments] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [servedFoodInfo, setServedFoodInfo] = useState({ imageURL: '', description: '' })
    const [volunteer, setVolunteer] = useState(null)
    const [rating, setRating] = React.useState(0);

    useEffect(() => {
        dispatch(getRequest(foodId))
    }, [foodId, dispatch])

    useEffect(() => {
        dispatch(getRatings())
    }, [dispatch])

    const handleConfirm = (request) => {
        dispatch(confirmRequest(request))
            .unwrap()
            .then(() => {
                toast.success('Confirmed successfully!')
            })
            .catch((error) => {
                toast.error(error)
            })
    }

    const handleOpenDocuments = (servedInfo, volunteer) => {
        setServedFoodInfo(servedInfo)
        setVolunteer(volunteer)
        setOpenDocuments(true)
    }

    const handleContactView = (request) => {
        const info = {
            name: request.volunteer.name,
            email: request.volunteer.email,
            phone: request.volunteer.phone,
            address: request.volunteer.address,
        }
        setContactInfo(info)
        handleOpen()
    }

    const handleRateSubmit = (e) => {
        dispatch(addRating({ volunteer, rating }))
            .unwrap()
            .then(() => {
                toast.success('Rated!')
                setOpenDocuments(false)
            })
            .catch((error) => {
                toast.error(error)
            })
        e.preventDefault()
    }

    if (isLoading || isRatingLoading) {
        return <Loader />
    }
    if (requests.length === 0) {
        return <Grid container spacing={4} sx={{ p: '0 32px' }}>
            <Grid item>
                <p>No request found</p>
            </Grid>
        </Grid>
    }
    return (
        <Container>
            {/* <Typography variant='subtitle1' sx={{ mb: '16px'}}>Requests for <br />Food Id: {foodId}</Typography> */}
            <Typography variant='h5' sx={{ mb: '16px'}}>Requests</Typography>
            <Grid container spacing={4}>
                {
                    requests.map(request => {
                        const totalRatings = ratings?.filter(element => element.volunteer === request.volunteer._id)
                        const ratingsCount = totalRatings?.length
                        const ratingTotal = totalRatings?.reduce((acc, curr) => acc + curr.rating, 0)
                        const avgRating = Math.round(ratingTotal / ratingsCount)
                        return (
                            <Grid item xs={12} md={3} key={ratings._id}>
                                <Paper sx={{ padding: '20px' }}>
                                    <Stack gap='6px' alignItems='flex-start'>
                                        {/* Volunteer Profile Start*/}
                                        <Stack
                                            direction='row'
                                            alignItems={'center'}
                                            columnGap='16px'
                                            sx={{ mb: '8px' }}
                                        >
                                            <img
                                                src={request.volunteer.imageURL}
                                                alt='volunteer_img'
                                                style={{
                                                    width: '42px',
                                                    height: '42px',
                                                    borderRadius: '100px'
                                                }}

                                            />
                                            <Box>
                                                <Typography variant='h6'>
                                                    Mr. {truncate(request?.volunteer?.name, 10)}
                                                </Typography>
                                                <Stack direction='column' columnGap={'8px'}>
                                                    <Rating
                                                        name="read-only"
                                                        size='small'
                                                        value={avgRating}
                                                        readOnly
                                                    />
                                                    <Typography>{ratingsCount} reviews</Typography>
                                                </Stack>

                                            </Box>
                                        </Stack>
                                        <Typography>
                                            Updated at {new Date(request.updatedAt).toDateString()}
                                        </Typography>
                                        <Typography
                                            variant='body2'
                                            sx={{ mb: '8px' }}
                                        >
                                            <Badge
                                                bg={request?.status === 'confirmed' ? 'primary' : 'warning'}
                                            >
                                                {request.food.status === 'served' ? request.food.status : request?.status}
                                            </Badge>
                                        </Typography>
                                        <Box sx={{ border: '1px solid #ccc', width: '100%', p: '6px' }}>
                                            <Typography variant='body2'>
                                                {truncate(request?.motivation, 30)}
                                            </Typography>
                                        </Box>
                                        {
                                            request.status === 'confirmed'
                                                ? (<Stack direction={'row'} columnGap='8px'>
                                                    <Button
                                                        variant='contained'
                                                        // endIcon={<CallIcon />}
                                                        onClick={() => { handleContactView(request) }}
                                                        sx={{ mt: '8px' }}
                                                    >
                                                        Contact
                                                    </Button>
                                                    {
                                                        request.food.status === 'served'
                                                            ? <Button
                                                                variant='contained'
                                                                size='small'
                                                                sx={{ mt: '8px' }}
                                                                onClick={() => handleOpenDocuments(request.food.servedInfo, request.volunteer._id)}
                                                            >
                                                                Documents
                                                            </Button>
                                                            : null
                                                    }
                                                </Stack>)
                                                : (<Button
                                                    onClick={() => handleConfirm(request)}
                                                    sx={{ mt: '8px' }}
                                                    variant='contained'
                                                    disabled={request.status === 'denied'}
                                                >
                                                    Confirm
                                                </Button>)
                                        }

                                    </Stack>
                                </Paper>
                            </Grid>
                        )
                    })
                }
                {/* Contact Modal */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Paper sx={{ padding: '20px' }}>
                            <Stack gap='8px'>
                                <Typography variant='h6'>Mr. {contactInfo.name}</Typography>
                                <Stack direction='row' alignItems='center' columnGap='8px'>
                                    <EmailIcon sx={{ fontSize: '18px' }} />
                                    <Typography variant='subtitle1'>{contactInfo.email}</Typography>
                                </Stack>
                                <Stack direction='row'>
                                    <CallIcon />
                                    <Typography>{contactInfo.phone}</Typography>
                                </Stack>
                                <Stack direction='row'>
                                    <LocationOnIcon />
                                    <Typography>{contactInfo.address}</Typography>
                                </Stack>
                                <Button variant='contained' onClick={handleClose}>Close</Button>
                            </Stack>
                        </Paper>
                    </Box>
                </Modal>
                {/* Documents Modal */}
                <Modal
                    open={openDocuments}
                    onClose={() => setOpenDocuments(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Paper>
                            <img style={{ width: '100%', height: '200px' }} src={servedFoodInfo.imageURL} alt='' />
                            <form style={{ padding: '8px' }} onSubmit={handleRateSubmit}>
                                <Typography sx={{ mb: '8px' }}>{servedFoodInfo.description}</Typography>
                                <Box sx={{ mb: '8px' }}>
                                    <Rating
                                        name="simple-controlled"
                                        value={rating}
                                        onChange={(event, newValue) => {
                                            setRating(newValue);
                                        }}
                                    />
                                </Box>
                                <Button
                                    type="submit"
                                    variant='contained'
                                    size='small'
                                    disabled={isRatingLoading}
                                >
                                    {isLoading? 'Loading': 'Rate'}
                                </Button>
                            </form>
                        </Paper>
                    </Box>
                </Modal>
            </Grid>
        </Container>
    )
}

export default RequestScreen