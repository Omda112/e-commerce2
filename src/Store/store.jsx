import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counter/conter.slice";
import {productsReducer} from "./products/products.slice";


let store = configureStore({
    reducer:{
        counter:counterReducer,
        products: productsReducer,
    }
})

export default store;