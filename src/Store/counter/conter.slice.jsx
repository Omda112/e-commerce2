import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    count:0,
    userName: "emad"
}

let counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increase: (state)=> {
            console.log("increase");
            state.count++
        },
        decrease: (state)=>{
            console.log("decrease")
            state.count--
        },
        increaseByValue: ()=> {
            console.log("increase");
        },
    }
})


export let counterReducer = counterSlice.reducer
export let {increase,decrease,increaseByValue} = counterSlice.actions