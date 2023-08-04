import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMe, updateUserProfile, uploadProfileImageFile } from '../features/auth/authSlice'
import Loader from '../components/Loader'
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import { toast } from 'react-toastify';

const typographyStyle = {
  borderBottom: '1px solid #ccc',
  padding: '0 0 8px 4px'
}

function ProfileScreen() {
  const dispatch = useDispatch()
  const { isUploading, isLoading, isError, error, profile } = useSelector(state => state.auth)
  const [editMode, setEditMode] = useState(false)
  const [fileData, setFileData] = useState(null)
  const [profileData, setProfileData] = useState({
    name: '', email: '', address: '', phone: ''
  })

  useEffect(() => {
    dispatch(getMe())
      .unwrap()
      .then((data) => {
        setProfileData(data)
      }).catch((err) => {
        toast.error(err)
      })
  }, [dispatch])

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    setFileData(bodyFormData)
  }

  const handleChange = (e) => {
    setProfileData((pre) => ({ ...pre, [e.target.name]: e.target.value }))
  }

  const handleUpdate = () => {
    dispatch(updateUserProfile(
      {
        imageURL: profile.imageURL,
        name: profileData.name,
        email: profileData.email,
        address: profileData.address,
        phone: profileData.phone
      }
    ))
      .unwrap()
      .then(() => {
        toast.success('Updated!')
        setEditMode(false)
      })
      .catch((error) => {
        toast.error('Something wrong!')
      })
  }
  const handleUpload = () => {
    dispatch(uploadProfileImageFile(fileData))
      .unwrap()
      .then(() => {
        toast.success('Uploaded')

      })
      .catch((error) => {
        toast.error(error)
      })
  }
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    <p>{error}</p>
  }

  const textFieldPadding = {padding:'0.5rem'}
  return (
    <Container>
      <Grid container sx={{ border: `1px solid #f2d2b8` }}>
        <Grid
          item xs={12}
          sx={{
            borderBottom: `1px solid #f2d2b8`,
            background: `#fbf0e7`
          }}
        >
          <Typography variant='subtitle1' sx={{ p: '8px 12px ' }}>User Profile</Typography>
        </Grid>

        {/* Image and info section */}
        <Grid item container sx={{ pt: '16px' }} columnGap={'32px'}>
          <Grid item container direction='column' rowGap='8px' md={3} sx={{ p: '0 16px', mb: '1rem' }}>
            <img src={profile.imageURL} alt="" style={{ width: '100%' }} />
            {
              editMode && <> <TextField onChange={handleFileChange} type='file' size='small' />
                <Button variant='contained' size='small' onClick={handleUpload} disabled={isUploading}>{isUploading ? 'Uploading...' : 'Upload'}</Button></>
            }
          </Grid>
          <Grid item container direction={editMode ? 'row' : 'column'} md={6} rowGap='16px'>
            {
              editMode
                ? (<>
                  <Grid item xs={12} sx={textFieldPadding}>
                    <TextField value={profileData.name} onChange={handleChange} fullWidth label='Name' name='name' variant='standard' />
                  </Grid>
                  <Grid item xs={12} sx={textFieldPadding}>
                    <TextField value={profileData.address} onChange={handleChange} fullWidth label='Address' name='address' variant='standard' />
                  </Grid>
                  <Grid item xs={12} sx={textFieldPadding}>
                    <TextField value={profileData.email} onChange={handleChange} fullWidth label='Email' name='email' variant='standard' />
                  </Grid>
                  <Grid item xs={12} sx={textFieldPadding}>
                    <TextField value={profileData.phone} onChange={handleChange} fullWidth label='Phone' name='phone' variant='standard' />
                  </Grid>
                </>
                )
                : (<>
                  <Box sx={{ borderBottom: '1px solid #ccc', marginBottom: '0.5rem', padding: '0 0.5rem' }}>
                    <Typography variant='h6'>{profile?.name}</Typography>
                    <Typography sx={{ fontSize: '12px' }} variant='subtitle2'>A proud user of Food Wastage Management System</Typography>
                  </Box>
                  <Stack direction={'row'} alignItems='center' sx={typographyStyle} columnGap='8px'>
                    <HomeIcon />
                    <Typography variant='subtitle2' >{profile.address}</Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems='center' columnGap='8px' sx={typographyStyle}>
                    <EmailIcon />
                    <Typography variant='subtitle2'>{profile.email}</Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems='center' columnGap='8px'>
                    <PhoneInTalkIcon />
                    <Typography variant='subtitle2' sx={{ p: '0 0 4px 4px' }}>{profile.phone}</Typography>
                  </Stack></>)
            }
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent={'flex-end'}
          xs={12}

          sx={{
            p: '8px'
          }}
        >
          {
            editMode
              ? (<>
                <Button
                  onClick={handleUpdate}
                  variant='contained'
                  sx={{ mr: '8px' }}
                >
                  Update
                </Button>
                <Button
                  variant='contained'
                  color='error'
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
              </>)
              : (<Button
                variant='contained'
                endIcon={<EditIcon />}
                onClick={() => setEditMode(true)}
              >
                Edit
              </Button>)
          }
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProfileScreen