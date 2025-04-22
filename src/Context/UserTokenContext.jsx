
import {createContext, useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode'


export let UserTokenContext = createContext()




export default function UserTokenContextProvider({children}){

    let [token,setToken] = useState()
    let [userId,setUserId] = useState()//

    function convertToken(){
        let data = jwtDecode(window.localStorage.getItem("token"))
        setUserId(data.id)
        // console.log(data);
        
    }

    useEffect(()=>{
        if(window.localStorage.getItem("token")){
            setToken(window.localStorage.getItem("token"))
            // console.log("helloz");
            convertToken()
            // console.log(userId)
        }
    },[]
    )

        // console.log(userId)
    return <UserTokenContext.Provider value={{token,setToken,convertToken,userId}}>
        {children}
    </UserTokenContext.Provider>
}



