import axios from "axios"
const URL = process.env.REACT_APP_API_URL+'/api/users/'

const signin = async (userData)=>{
    const res = await axios.post(URL+'signin', userData)
    if(res){
        localStorage.setItem('user', JSON.stringify(res.data))
    }
    return res.data
}

const signup = async (userData)=>{
    const res = await axios.post(URL+'signup', userData)
    if(res){
        localStorage.setItem('user', JSON.stringify(res.data))
    }
    return res.data
}

const getMe = async (token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(URL + `/me`, config)
    return res.data
}

//Upload profile image
const uploadProfileImageFile = async (imgageData, token) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${token}`,
        }
    }
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, imgageData, config)
    return data
}

const updateUserProfile = async (data, token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.put(URL + `/me`, data, config)
    // if(res){
    //     localStorage.setItem('user', JSON.stringify(res.data))
    // }
    return res.data
}

const signout =  ()=>{
    localStorage.removeItem('user')
}

export const authService = {signin, signout, updateUserProfile, signup, getMe, uploadProfileImageFile}