import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import FoodForm from '../components/FoodForm'
import Loader from '../components/Loader'
import { getFoodById } from '../features/foods/foodSlice'

function FoodEditScreen() {
    const dispatch = useDispatch()
    const {foodId} = useParams()
    const { food, isLoading, isError, error } = useSelector(state => state.food)
    useEffect(()=>{
        dispatch(getFoodById(foodId))
    },[dispatch, foodId])
    return (
        <>{
            isLoading ? (<Loader />) : (<FoodForm data={food} />)
        }
        </>
    )
}

export default FoodEditScreen