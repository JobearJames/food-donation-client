import axios from "axios"
const URL = process.env.REACT_APP_API_URL + '/api/requests'

const getRequest = async (foodId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(URL+`/${foodId}`)
    const res = await axios.get(URL+`/foods/${foodId}`, config)
    return res.data
}

const getRequestByVolunteer = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(URL+`/volunteers`, config)
    return res.data
}

const makeRequest = async (requestData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(URL,requestData, config)
    return res.data
}

//Confirm request
const confirmRequest = async (requestData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.put(URL+'/confirm',requestData, config)
    console.log(res.data)
    return res.data
}
//Delete request
const deleteRequest = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.delete(`${URL}/${id}`, config)
    console.log(res)
    return res.data
}

export const requestService = {
    getRequest,
    makeRequest,
    getRequestByVolunteer,
    confirmRequest,
    deleteRequest,
}