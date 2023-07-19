import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../Pages/UserPages/LoginPage'
import SignupPage from '../Pages/UserPages/SignupPage'
import { useSelector,useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'

import HomePage from '../Pages/UserPages/HomePage'
import { addUserDetails } from '../Store/UserAuth'
import ProfilePage from '../Pages/UserPages/ProfilePage'
const UserRoute = () => {
  const [cookies]=useCookies(['jwt'])
  const dispatch = useDispatch();
  const userToken  = useSelector((state)=>state.user.userName);
  console.log("userToken: " ,userToken)
  useEffect(()=>{ 
     if(cookies.jwt){
        console.log("cookieskkkkkkk : " ,cookies.jwt)
        console.log("cookieskkkkkkk1 : " ,cookies)
        console.log("cookieskkkkkkk2 : " ,cookies.jwt.userName)
        dispatch(addUserDetails({name:cookies.jwt.userName,token:cookies.jwt.token}))
    //  }else{
    //    console.log("no cokkies.jwt")
    //  }
     }
  },[cookies,dispatch])
  return (
    <div>
        <Routes>
            <Route path='/' element={userToken?<HomePage/>:<LoginPage/>}/>
            <Route path='/home' element={userToken?<HomePage/>:<LoginPage/>} />
            <Route path='/signup' element={<SignupPage/>} />
            <Route path='/profile' element={userToken?<ProfilePage/>:<LoginPage/>} />
        </Routes>
    </div>
  )
}

export default UserRoute
