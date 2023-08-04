import { Box, Button, Container, Grid, Modal, Paper, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import CallIcon from '@mui/icons-material/Call';
import CancelIcon from '@mui/icons-material/Cancel';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import PlaceIcon from '@mui/icons-material/Place';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Badge from '../components/Badge'
import { deleteRequest, getRequestByVolunteer } from '../features/request/requestSlice'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import { truncate } from '../utils/truncate';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../utils/getErrorMessage';
import axios from 'axios';
import Loader from '../components/Loader';
import { updateFoodById } from '../features/foods/foodSlice';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs:'90%', sm:'600px'},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

function RequestListScreen() {
  const dispatch = useDispatch()
  const { volunteerRequests, isLoading } = useSelector(state => state.request)
  const [contactInfo, setContactInfo] = useState({})
  const [open, setOpen] = useState(false)
  const [serveOpen, setServeOpen] = useState(false)
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
    servedInfo: {
      imageURL: '',
      description: '',
    }
  })

  useEffect(() => {
    dispatch(getRequestByVolunteer())
  }, [dispatch])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleServe = (food) => {
    setServeOpen(true)
    setFoodInfo(food)
  }
  const handleCancel = (id)=>{
    if (window.confirm("Do you really want to cancel?")) {
      dispatch(deleteRequest(id))
      .unwrap()
      .then(()=>{
        toast.success('Deleted!')
      })
      .catch((err)=>{
        toast.error(err)
      })
    }
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
        ...pre, servedInfo: { ...pre.servedInfo, imageURL: data.secure_url }
      }))
      toast.success('Uploaded!')
    } catch (error) {
      setIsUploading(false)
      toast.error(getErrorMessage(error))
    }
  }

  const handleUpdate = ()=>{
    dispatch(updateFoodById({...foodInfo, status:'served'}))
                .unwrap()
                .then((res) => {
                    setFoodInfo(res)
                    toast.success('Food Updated')
                    setServeOpen(false)

                })
                .catch((error) => {
                    toast.error(error)
                })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    setFileData(bodyFormData)
  }

  const handleInputChange = (e) => {
    setFoodInfo((pre) => ({ ...pre, servedInfo: { ...pre.servedInfo, [e.target.name]: e.target.value } }))
  }

  const handleContactView = (request) => {
    const info = {
      name: request.donor.name,
      email: request.donor.email,
      phone: request.donor.phone,
      address: request.donor.address,
    }
    setContactInfo(info)
    handleOpen()
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Container>
      <Typography variant='h5' sx={{ mb: '32px' }}>All Requests</Typography>
      <Grid container spacing={4}>
        {
          volunteerRequests.map(request => (
            <Grid item md={3} key={request._id}>
              <Paper>
                <img
                  src={request?.food?.imageURL}
                  alt='food'
                  style={{ width: '100%', height: '200px', borderRadius: '10px 10px 0 0' }}
                />
                <Stack gap='6px' alignItems='flex-start' sx={{ padding: '16px' }}>
                  <Typography variant='h6'>
                    Donated by Mr. {truncate(request?.donor?.name, 7)}
                  </Typography>
                  <Stack direction='row' alignItems='center' spacing={0.5}>
                    <LunchDiningIcon sx={{ fontSize: '16px' }} />
                    <Typography variant='subtitle1' sx={{ mr: '4px' }}>
                      {request?.food?.foodName}
                    </Typography>
                  </Stack>
                  <Stack
                    direction='row'
                    alignItems='center'
                    spacing={0.5}
                  >
                    <PlaceIcon sx={{ fontSize: '16px' }} />
                    <Typography variant='subtitle2'>Update
                      {request?.food?.area}
                    </Typography>

                  </Stack>
                  <Typography
                    variant='body2'
                  >
                    {truncate(request.motivation, 30)}
                  </Typography>
                  <Typography variant='body2'>
                    Updated At {new Date(request.updatedAt).toDateString()}
                  </Typography >
                  <Typography variant='subtitle2' sx={{ textTransform: 'capitalize', mb: '16px' }}>
                    <Badge bg={request?.status === 'confirmed' ? 'primary' : request?.status === 'denied' ? 'error' : 'warning'}>
                      {request?.food?.status==='served'? request.food.status:request.status}
                    </Badge>
                  </Typography>
                  <>
                    {
                      request.status === 'confirmed'
                        ? (<Stack direction={'row'} columnGap='8px'>
                          <Button
                            variant='contained'
                            endIcon={<CallIcon />}
                            onClick={() => { handleContactView(request) }}
                          >
                            Contact
                          </Button>
                          <Button variant='contained' onClick={() => handleServe(request.food)}>
                            Serve
                          </Button>
                        </Stack>
                        ) : (
                          <Stack direction={'row'} columnGap='8px'>
                            {/* <Button
                              variant='contained'
                              endIcon={<EditIcon />}
                              disabled={request.status === 'denied'}

                            >
                              Edit
                            </Button> */}
                            <Button
                              onClick={()=>handleCancel(request._id)}
                              endIcon={<CancelIcon />}
                              color={request.status === 'pending' ? "error" : "primary"}
                              variant='contained'
                              disabled={request.status === 'denied'}
                            >
                              {isLoading? 'Loading': 'Cancel'}
                            </Button>
                          </Stack>
                        )
                    }
                  </>
                </Stack>
              </Paper>
            </Grid>
          ))
        }

        {/* Contact info modal */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{maxWidth:'90%'}}
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

        {/* Serve form modal */}
        <Modal
          open={serveOpen}
          onClose={() => setServeOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Paper sx={{ padding: '20px' }}>
              <form>
                <Grid container rowGap={3}>
                  <Grid item>
                    <Typography variant='h6'>Make Food As Served</Typography>
                  </Grid>
                  {
                    foodInfo?.servedInfo?.imageURL
                    ?(<Grid item xs={12}>
                      <img style={{width:'100%', height:'200px'}} src={foodInfo.servedInfo.imageURL} alt='food'/>
                    </Grid>):null
                  }
                  <Grid item xs={12}>
                    <TextField size='small' fullWidth label="Image URL" name='imageURL' value={foodInfo.servedInfo.imageURL} />
                  </Grid>
                  <Grid item container direction={'row'} alignItems='center' spacing={2}>
                    <Grid item xs={12}>
                      <TextField size='small' onChange={handleFileChange} type='file' />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant='contained'
                        type="button"
                        size='small'
                        onClick={handleUpload}
                        disabled={isUploading}
                        fullWidth
                      >
                        {isUploading ? 'uploading' : 'upload'}
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      size='small'
                      label="Description"
                      name='description'
                      value={foodInfo.servedInfo.description}
                      fullWidth multiline
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      disabled={isUploading}
                      onClick={handleUpdate}
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Box>
        </Modal>
      </Grid>
    </Container>
  )
}

export default RequestListScreen