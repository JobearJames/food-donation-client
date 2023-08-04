import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "./productService";

const initialState = {
    products: [],
    product: {},
    productList: [],
    productEdit: {},
    isLoading: false,
    isUploading: false,
    isSuccess: false,
    isError: false,
    error: ''
}

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async (_, thunkApi) => {
        try {
            return await productService.getProducts()
        } catch (error) {
            const message = error.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getProductList = createAsyncThunk(
    'product/getProductList',
    async (page, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await productService.getProductList(page, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getProduct = createAsyncThunk(
    'product/getProduct',
    async (slug, thunkApi) => {
        try {
            return await productService.getProduct(slug)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getProductEdit = createAsyncThunk(
    'product/getProductEdit',
    async (id, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await productService.getProductEdit(id, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)


export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (_, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await productService.createProduct(token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (updatedProductInfo, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await productService.updateProduct(updatedProductInfo, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (productId, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await productService.deleteProduct(productId, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const uploadProductImageFile = createAsyncThunk(
    'product/uploadProductImageFile',
    async (formData, thunkApi)=>{
        const token = thunkApi.getState().auth.user.token
        return await productService.uploadProductImageFile(formData, token)
    }
)

export const productSlice = createSlice({
    name: 'product',
    initialState,

    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.error = ''
        },
        resetProductEdit: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.productEdit = {}
            state.isError = false
            state.error = ''
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = payload
            })
            .addCase(getProducts.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.error = payload
            })

            .addCase(getProduct.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
                state.error = ''
            })
            .addCase(getProduct.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isSuccess = true
                state.product = payload
                state.isError = false
                state.error = ''
            })
            .addCase(getProduct.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.error = payload
            })
            .addCase(getProductEdit.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
                state.error = ''
            })
            .addCase(getProductEdit.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isSuccess = true
                state.productEdit = payload
                state.isError = false
                state.error = ''
            })
            .addCase(getProductEdit.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.error = payload
            })

            .addCase(getProductList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductList.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isSuccess = true
                state.productList = payload
                state.isError = false
                state.error = ''
            })
            .addCase(getProductList.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.error = payload
            })

            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
                state.error = ''
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.productEdit = action.payload
                state.isError = false
                state.error = ''
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.error = action.payload
            })

            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
                state.error = ''
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.productList.products  =  state.productList.products.filter(p=>p._id !==action.payload._id)
                state.isError = false
                state.error = ''
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.error = action.payload
            })
            .addCase(uploadProductImageFile.pending, (state)=>{
                state.isUploading = true
                state.isSuccess = false
                state.isError = false
                state.error = ''
            })
            .addCase(uploadProductImageFile.fulfilled, (state, {payload})=>{
                state.isUploading = false
                state.isSuccess = true
                state.productEdit = payload.secure_url? {...state.productEdit, image: payload.secure_url}:state.productEdit
                state.isError = false
                state.error = ''
            })
            .addCase(uploadProductImageFile.rejected, (state, action) => {
                state.isUploading = false
                state.isSuccess = false
                state.isError = true
                state.error = action.payload
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.error = action.payload
            })
    }
})

export const { reset, resetProductEdit } = productSlice.actions
export default productSlice.reducer
