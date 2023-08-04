import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ratingService } from "./ratingService"

const initialState = {
    ratings: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: ''
}

export const getRatings = createAsyncThunk(
    'auth/getRatings',
    async (_, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await ratingService.getRatings(token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const addRating = createAsyncThunk(
    'rating/addRating',
    async (data, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await ratingService.addRating(data, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const ratingSlice = createSlice({
    name: 'rating',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getRatings.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getRatings.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.ratings = action.payload
            })
            .addCase(getRatings.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })

            .addCase(addRating.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addRating.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.ratings = [...state.ratings, action.payload]
            })
            .addCase(addRating.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})
// export const { } = ratingSlice.actions
export default ratingSlice.reducer