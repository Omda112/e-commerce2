import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Await } from "react-router-dom";



export let getProducts = createAsyncThunk("products/getProducts",async()=>{
    let data = await fetch('https://ecommerce.routemisr.com/api/v1/products?limit=10');
    let res = await data.json()
    console.log(res)
    return res.data
})

let initialState = {products:[],isLoading:true,isError:false}


let productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getProducts.fulfilled,(state,actions)=>{
            console.log(state,"hello from extra reducers");
            state.products= actions.payload
            state.isLoading= false
        }
        )
        builder.addCase(getProducts.pending,(state,actions)=>{
            console.log(state,"hello from extra reducers");
            state.isLoading= true
        }
        )
        builder.addCase(getProducts.rejected,(state,actions)=>{
            state.isLoading= false
            state.isError = true
        }
        )
    }
})


export let productsReducer = productSlice.reducer