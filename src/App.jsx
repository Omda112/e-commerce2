
import LayOut from './components/LayOut/LayOut.jsx'
import Register from './components/Register/Register.jsx'
import Cart from './components/Cart/Cart.jsx'
import About from './components/About/About.jsx'
import Categories from './components/Categories/Categories.jsx'
import Brands from './components/Brands/Brands.jsx'
import Products from './components/Products/Products.jsx'
import NotFound from './components/NotFound/NotFound.jsx'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import CounterContextProvider, { CounterContext } from './Context/CounterContext.jsx'
import UserTokenContextProvider from './Context/UserTokenContext.jsx'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes.jsx'
import ProductDetail from './components/ProductDetail/ProductDetail.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider, { CartContext } from './Context/CartContext.jsx'
import { Toaster } from 'react-hot-toast';
import store from './Store/store.jsx'
import { Provider } from 'react-redux'
import Checkout from './components/Checkout/Checkout.jsx'
import Orders from './components/Orders/Orders.jsx'
import { lazy, Suspense, useContext, useEffect } from 'react'
import { Offline, Online } from 'react-detect-offline'
// import Contact from './components/contact/contact.jsx'
import WishList from './components/WishList/WishList.jsx'
import WishListContextProvider,{WishListContext} from './Context/WishListContext.jsx'
import RecommendedProducts from './components/RecommendedProducts/RecommendedProducts.jsx'
import ForgetPass from './components/ForgetPass/ForgetPass.jsx'
import OTPVerfy from './components/OTP/OTPVerfy.jsx'
import UpdateUserData from './components/UpdateUserData/UpdateUserData.jsx'



let Home = lazy(()=>import('./components/Home/Home.jsx'))
let query = new QueryClient('./components/Home/Home.jsx')


const routes = createBrowserRouter([
  {path:"",element:<LayOut/>,children:[
    { path: "register" , element:<Register/>},
    { index:true , element:<ProtectedRoutes>
      <Suspense fallback={<h1 className='text-green-500'>Hello from home loading</h1>}>
          <Home/>
      </Suspense>
    </ProtectedRoutes> },
    { path:"Home" , element: <ProtectedRoutes>
      <Suspense fallback={<h1 className='text-green-500'>Hello from home loading</h1>}>
          <Home/>
      </Suspense>
    </ProtectedRoutes>  },
    { path:"cart" , element: <ProtectedRoutes><Cart/></ProtectedRoutes>  },
    { path:"about" , element:<ProtectedRoutes><About/></ProtectedRoutes>   },
    { path:"categories" , element: <ProtectedRoutes><Categories/></ProtectedRoutes>  },
    { path:"brands" , element: <ProtectedRoutes><Brands/></ProtectedRoutes>  },
    { path:"productDetails/:id/:category" , element: <ProtectedRoutes><ProductDetail/></ProtectedRoutes>  },
    { path:"productDetails/:id" , element: <ProtectedRoutes><ProductDetail/></ProtectedRoutes>  },
    { path:"products" , element: <ProtectedRoutes><RecommendedProducts/></ProtectedRoutes>},
    {path:"login" , element: <Login/> },
    {path:"checkout/:cartId", element: <ProtectedRoutes><Checkout/></ProtectedRoutes>},
    {path:"allOrders", element: <ProtectedRoutes><Orders/></ProtectedRoutes>},
    // {path:"contact", element: <ProtectedRoutes><Contact/></ProtectedRoutes>},
    {path:"wishlist", element: <ProtectedRoutes><WishList/></ProtectedRoutes>},
    {path:"Fpassword", element: <ForgetPass/>},
    {path:"verfication", element: <OTPVerfy/> },
    {path:"updateData", element: <UpdateUserData/> },
    {path:"*",element: <NotFound/>}
  ]}
])



function App() {

  
  let {getCart,setCartItemsNo} = useContext(CartContext)

  async function getCartInfo(){
    let res = await getCart()
    setCartItemsNo(res.numOfCartItems)
    setIsLoading(false)
  }
  
  useEffect(()=>{
    getCartInfo()
  })
 
  return (
    <>


    
    <Provider store = {store}>

    <QueryClientProvider client={query}>
      <UserTokenContextProvider>
        <CounterContextProvider>
            
              <RouterProvider router={routes}></RouterProvider>  
            <Toaster/>
          <ReactQueryDevtools></ReactQueryDevtools>

        </CounterContextProvider>
        <Online>
          <div className='bg-green-500 text-white fixed bottom-0 left-0 p-2'>
              Only shown when you're online
          </div>
          </Online>

        <Offline>
          <div className='bg-red-500 text-white fixed bottom-0 left-0 p-2'>
            Only shown offline (surprise!)
          </div>
          
          </Offline>
      </UserTokenContextProvider>
    </QueryClientProvider>
    
    </Provider>
    
    </>
  )
}

export default App
