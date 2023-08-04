import {
    Typography,
    Grid,
    TextField,
    Button,
    CircularProgress,
    Container,
    Paper
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckIcon from '@mui/icons-material/Check';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createFood, updateFoodById } from '../features/foods/foodSlice'

import donation_image from '../assets/donation_box.jpg'
import axios from 'axios';
import { getErrorMessage } from '../utils/getErrorMessage';

function FoodForm({ data }) {
    const { isLoading } = useSelector(state => state.food)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { foodId } = useParams()
    const [isUploading, setIsUploading] = useState(false)
    const [fileData, setFileData] = useState(null)

    const [foodInfo, setFoodInfo] = useState({
        address: '',
        description: '',
        foodName: '',
        imageURL: '',
        area: '',
        quantity: '1',
        location: {
            lat: '',
            lng: '',
        },
    })

    const [validtaionError, setValidationError] = useState({
        address: '',
        description: '',
        foodName: '',
        imageURL: '',
        area: '',
        location: ''
    })
    useEffect(() => {
        if (data) {
            setFoodInfo(data)
        }
    }, [data])
    const { address, location, description, area, foodName, quantity, imageURL } = foodInfo

    const handleInputChange = (e) => {
        const newFoodInfo = { ...foodInfo }
        newFoodInfo[e.target.name] = e.target.value;
        setFoodInfo(newFoodInfo);
    }

    const handleUpload = async () => {
        const URL = process.env.REACT_APP_API_URL
        const token = JSON.parse(localStorage.getItem('user')).token
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                authorization: `Bearer ${token}`,
            }
        }
        setIsUploading(true)
        try {
            const { data } = await axios.post(`${URL}/api/upload`, fileData, config)
            setIsUploading(false)
            setFoodInfo((pre) => ({
                ...pre, imageURL: data.secure_url
            }))
            toast.success('Uploaded!')
        } catch (error) {
            setIsUploading(false)
            toast.error(getErrorMessage(error))
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        setFileData(bodyFormData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        //***Setting error message before form submit */
        for (let param in foodInfo) {
            if (foodInfo[param]) {
                if (param === 'location' && (!foodInfo[param].lat || !foodInfo[param].lng)) {
                    console.log('Inside Location param')
                    setValidationError(prev => ({ ...prev, [param]: `Please access your location!` }))
                }
                else {
                    setValidationError(prev => ({ ...prev, [param]: '' }))
                }
            } else {
                if (param === 'foodName') {
                    setValidationError(prev => ({ ...prev, [param]: `Food name can't be empty!` }))
                }
                if (param === 'imageURL') {
                    setValidationError(prev => ({ ...prev, [param]: `Upload an image!` }))
                }
                else {
                    setValidationError(prev => ({ ...prev, [param]: `${param.charAt(0).toUpperCase() + param.slice(1)} can't be empty!` }))
                }
            }
        }

        let newFoodInfo = { ...foodInfo, location: { ...foodInfo.location } }

        if (foodId) {
            //***Update food***/
            dispatch(updateFoodById(newFoodInfo))
                .unwrap()
                .then(() => {
                    toast.success('Food Updated')
                    navigate('/donations')

                })
                .catch((error) => {
                    toast.error(error)
                })
        } else {
            //***Create Food***/
            dispatch(createFood(newFoodInfo))
                .unwrap()
                .then(() => {
                    toast.success('Food added')
                    navigate('/donations')

                })
                .catch((error) => {
                    toast.error(error)
                })
        }
    }

    //Access Location from user
    const getLocation = (position) => {
        const newFoodInfo = { ...foodInfo }
        newFoodInfo.location = {
            lat: +position.coords.latitude,
            lng: +position.coords.longitude
        };
        setFoodInfo(newFoodInfo);
        toast.success('Accessed your location')
    }
    const handleError = (err) => {
        toast.error(err)
    }
    const accessLocation = () => {
        navigator.geolocation.getCurrentPosition(getLocation, handleError);
    }

    return (
        <Container maxWidth='md' sx={{ mb: '32px' }}>
            <Grid container direction='column'>
                <Grid item container justifyContent='center'>
                    <img
                        src={donation_image}
                        alt='donation_pic'
                        style={{ height: '120px' }}
                    />
                </Grid>
                <Grid
                    item
                >
                    <Paper sx={{ padding:{xs:'0.5rem', sm:'2rem'}, background: '#fbf0e7' }}>
                        <Grid
                            container
                            direction='column'
                            rowGap={'1.5rem'}
                            component='form'
                            onSubmit={handleSubmit}
                            sx={{ width: '100%' }}
                        >
                            <Grid item sx={{ mb: '32px' }}>
                                <Typography
                                    variant='h4'
                                    align='center'
                                    sx={{
                                        borderBottom: '1px solid lightGray',
                                        pb: '2rem',
                                    }}>
                                    Food Donation
                                </Typography>
                            </Grid>
                            <Grid item >
                                <Button
                                    onClick={accessLocation}
                                    variant='contained'
                                    type="button"
                                    endIcon={foodInfo?.location.lat && foodInfo?.location.lng ? <CheckIcon /> : <LocationOnIcon />}
                                >
                                    {foodInfo?.location.lat && foodInfo?.location.lng ? 'Accessed Location' : 'Access Location'}
                                </Button>
                                <Typography variant='body2' color={'error'} style={{ marginTop: '0.125rem' }}>{validtaionError?.location}</Typography>
                            </Grid>

                            <Grid item>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    label='Enter donation area'
                                    placeholder='Donation area'
                                    onChange={handleInputChange}
                                    name='area'
                                    value={area}
                                    error={validtaionError.area ? true : false}
                                    helperText={validtaionError.area}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    label='Enter donation address'
                                    placeholder='Donation address'
                                    onChange={handleInputChange}
                                    name='address'
                                    value={address}
                                    error={validtaionError.address ? true : false}
                                    helperText={validtaionError.address}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    label='Enter food name'
                                    placeholder='Enter food name'
                                    name='foodName'
                                    value={foodName}
                                    onChange={handleInputChange}
                                    error={validtaionError.foodName ? true : false}
                                    helperText={validtaionError.foodName}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    label="How many people's food"
                                    placeholder="How many people's food"
                                    name='quantity'
                                    type='number'
                                    value={quantity}
                                    inputProps={{ min: 1, pattern: "[0-9]*" }}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    id="outlined-basic"
                                    variant="outlined"
                                    label='Enter food description'
                                    name='description'
                                    value={description}
                                    onChange={handleInputChange}
                                    error={validtaionError.description ? true : false}
                                    helperText={validtaionError.description}
                                />
                            </Grid>
                            {
                                imageURL && (
                                    <Grid item>
                                        <img style={{ height: '150px', borderRadius: '8px' }} src={imageURL} alt='' />
                                    </Grid>
                                )
                            }
                            <Grid item container columnSpacing={2} rowSpacing={2}>
                                <Grid item xs={12} sm={10}>
                                    {
                                        isUploading
                                            ? <CircularProgress />
                                            : <TextField
                                                fullWidth
                                                size='small'
                                                type='file'
                                                onChange={handleFileChange}
                                                error={validtaionError.imageURL ? true : false}
                                                helperText={validtaionError.imageURL}
                                            />
                                    }
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Button
                                        variant='contained'
                                        size='small'
                                        onClick={handleUpload}
                                        disabled={isUploading || !fileData}
                                        fullWidth
                                    >
                                        Upload
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item container>
                                <Grid item >
                                    {
                                        isLoading
                                            ? <CircularProgress />
                                            : <Button
                                                variant='contained'
                                                size='large'
                                                type="submit"
                                            >
                                                Submit
                                            </Button>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default FoodForm