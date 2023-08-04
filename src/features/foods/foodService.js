import axios from "axios"
const URL = process.env.REACT_APP_API_URL + '/api/foods'

//Create a new food
const createFood = async (foodData, token) => {
    console.log('In service',foodData)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(URL, foodData, config)
    console.log('created food',res.data)
    return res.data
}

//Get all the food
const getFood = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(URL, config)
    return res.data
}

//Get all the donated food of an user
const getUserFoods = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(URL + '/my', config)
    return res.data
}

//Get food By Id
const getFoodById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${URL}/${id}`, config)
    return res.data
}

//Update food By Id
const updateFoodById = async (food, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.put(`${URL}/${food._id}`,food, config)
    return res.data
}
//Delete food By Id
const deleteFoodById = async (foodId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.delete(`${URL}/${foodId}`, config)
    console.log(res.data)
    return res.data
}

//Upload image file
const uploadFoodImageFile = async (imgageData, token) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${token}`,
        }
    }
    const { data } = await axios.post(`/api/upload`, imgageData, config)
    return data
}


export const foodService = {
    createFood,
    getFood,
    getUserFoods,
    uploadFoodImageFile,
    getFoodById,
    updateFoodById,
    deleteFoodById
}