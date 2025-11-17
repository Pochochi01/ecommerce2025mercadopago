import axios from "axios";
import { createSlice, createAsyncThunk }  from "@reduxjs/toolkit";



const initialState = {
    approvalURL: null,
    isLoading: false,
    orderId : null,
    orderList: [],
    orderDetails: null,
}

export const createNewPayment = createAsyncThunk('/payment/createNewPayment', async(orderData)=>{
    const response = await axios.post('http://31.97.85.19:5000/api/shop/payment/create', orderData);
    return response.data
})

export const capturePayment = createAsyncThunk('/payment/capturePayment', async({paymentId, payerId, orderId})=>{
    const response = await axios.post('http://31.97.85.19:5000/api/shop/payment/capture', {paymentId, payerId, orderId});
    return response.data
})

export const getAllOrdersByUserId = createAsyncThunk('/payment/getAllOrdersByUserId', async(userId)=>{
    const response = await axios.get(`http://31.97.85.19:5000/api/shop/payment/list/${userId}`);
    return response.data
})

export const getOrderDetails = createAsyncThunk('/payment/getOrderDetails', async(id)=>{
    const response = await axios.get(`http://31.97.85.19:5000/api/shop/payment/details/${id}`);
    return response.data
})

const shoppingPaymentSlice = createSlice({
    name:'shoppingPaymentSlice',
    initialState,
    reducers:{
        resetOrderDetails:(state)=>{
            state.orderDetails = null
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createNewPayment.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createNewPayment.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.approvalURL = action.payload.approvalURL;
            state.orderId = action.payload.orderId;
            sessionStorage.setItem('currentOrderId',JSON.stringify(action.payload.orderId));
        })
        .addCase(createNewPayment.rejected, (state)=>{
            state.isLoading = false;
            state.approvalURL = null;
            state.orderId = null;
        })

        .addCase(getAllOrdersByUserId.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllOrdersByUserId.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.orderList = action.payload.data;
        })
        .addCase(getAllOrdersByUserId.rejected, (state)=>{
            state.isLoading = false;
            state.orderList = [];
        })

        .addCase(getOrderDetails.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getOrderDetails.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.orderDetails = action.payload.data;
        })
        .addCase(getOrderDetails.rejected, (state)=>{
            state.isLoading = false;
            state.orderDetails = null;
        });
    }
});

export const {resetOrderDetails} = shoppingPaymentSlice.actions;

export default shoppingPaymentSlice.reducer;