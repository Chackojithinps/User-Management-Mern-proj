import axios from 'axios'
import React, { useEffect } from 'react'
axios.defaults.withCredentials = true
function User() {
  const getDetails =async()=>{
    console.log("Helllllllllll")
     const res = await axios.get('http://localhost:5000/api/user',{
        withCredentials:true
     }).then((res)=>res.data).catch((err)=>{
        console.log("errrrrr ",err.message)
     })
     console.log("res : "+res)
  }
  useEffect(()=>{
    getDetails().then((data)=>console.log(data))
  },[])
  return (
    <div>
       Welcome to user Details
    </div>
  )
}

export default User
