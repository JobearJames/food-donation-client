import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestService } from "./requestService";

const initialState = {
    requests: [],
    volunteerRequests: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: ''
}

//Make request
export const makeRequest = createAsyncThunk(
    'request/makeRequest',
    async (requestData, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await requestService.makeRequest(requestData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)
//Confirm request
export const confirmRequest = createAsyncThunk(
    'request/confirmRequest',
    async (requestData, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await requestService.confirmRequest(requestData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

//Get request for Donor by food id
export const getRequest = createAsyncThunk(
    'request/getRequest',
    async (foodId, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await requestService.getRequest(foodId, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

//Get requests by volunteer
export const getRequestByVolunteer = createAsyncThunk(
    'request/getRequestByVolunteer',
    async (_, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await requestService.getRequestByVolunteer(token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)
//Delete request by id
export const deleteRequest = createAsyncThunk(
    'request/deleteRequest',
    async (id, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await requestService.deleteRequest(id, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const requestSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getRequest.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getRequest.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.requests = action.payload
            })
            .addCase(getRequest.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.error = payload
            })
            .addCase(getRequestByVolunteer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getRequestByVolunteer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.volunteerRequests = action.payload
            })
            .addCase(getRequestByVolunteer.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.error = payload
            })
            .addCase(makeRequest.pending, (state) => {
                state.isLoading = true
            })
            .addCase(makeRequest.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.error = ''
            })
            .addCase(makeRequest.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.error = payload
            })

            .addCase(confirmRequest.pending, (state) => {
                state.isLoading = true
            })
            .addCase(confirmRequest.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.requests = action.payload
            })
            .addCase(confirmRequest.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.error = payload
            })

            .addCase(deleteRequest.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteRequest.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.volunteerRequests = state.volunteerRequests.filter((request)=>request._id!==action.payload._id)
            })
            .addCase(deleteRequest.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.error = payload
            })
    }
})

export default requestSlice.reducer