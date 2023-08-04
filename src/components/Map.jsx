import React, { useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import useLocation from '../hooks/useLocation';
import { Button, Modal, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { setSelectedFood } from '../features/foods/foodSlice';
import SendIcon from '@mui/icons-material/Send';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};

const containerStyle = {
    width: '100%',
    height: '400px'
};

const Map = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [open, setOpen] = React.useState(false);
    const [clickedFood, setClickedFood] = useState({})
    const {user} = useSelector(state=>state.auth)

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
    })
    const { foods } = useSelector(state => state.food)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onLoad = marker => {
        //console.log('marker: ', marker)
    }
    const handlefoodClick = (food) => {
        setClickedFood(food)
        handleOpen(true)
    }

    const handleMakeRequest = (food) => {
        dispatch(setSelectedFood(food))
        navigate(`/foods/${food._id}`)
    }

    if (!location?.loaded || !isLoaded) {
        return <Loader />
    }

    if (location.error) {
        return <p>{location?.error?.message}</p>
    }
    return (
        <div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={location.coordinates}
                zoom={11}
            >
                {
                    foods?.map(food => {
                        const position = food.location
                        return (
                            food?.status === 'available' && position && <MarkerF
                                key={food._id}
                                onLoad={onLoad}
                                position={position}
                                onClick={() => handlefoodClick(food)}
                            />
                        )
                    })
                }
            </GoogleMap>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Paper>
                        <img
                            src={clickedFood.imageURL}
                            alt='food'
                            style={{ width: '100%', height: '200px', borderRadius: '10px 10px 0 0' }}
                        />
                        <Stack sx={{p:'8px 16px'}}>
                            <Typography variant='h6'>{clickedFood?.foodName}</Typography>
                            <Typography variant='subtitle1'>{clickedFood?.description}</Typography>
                            <Typography variant='subtitle1'>{clickedFood?.area}</Typography>
                            <Typography variant='subtitle1'>{clickedFood?.address}</Typography>
                            <Button
                                endIcon={<SendIcon/>}
                                sx={{ mt: '8px' }}
                                variant='contained'
                                onClick={() => handleMakeRequest(clickedFood)}
                                disabled={clickedFood.donor === user._id}


                            >
                               {clickedFood.donor === user._id?"Your Donated Food":'Make Request'}
                            </Button>
                        </Stack>
                    </Paper>
                </Box>
            </Modal>
        </div>
    );
};

export default Map;