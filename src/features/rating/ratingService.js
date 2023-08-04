import axios from "axios"
const URL = process.env.REACT_APP_API_URL + '/api/rates'

//Get ratings
const getRatings = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(URL, config)
    return res.data
}

//Add ratings
const addRating = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(URL, data, config)
    return res.data
}

export const ratingService = {
    getRatings,
    addRating
}