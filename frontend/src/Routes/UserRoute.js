import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../Pages/UserPages/LoginPage'
import SignupPage from '../Pages/UserPages/SignupPage'
import HomePage from '../Pages/UserPages/HomePage'
const UserRoute = () => {
  return (
    <div>
        <Routes>
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/home' element={<HomePage/>} />
            <Route path='/signup' element={<SignupPage/>} />
        </Routes>
    </div>
  )
}

export default UserRoute
