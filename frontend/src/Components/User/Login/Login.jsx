import React, { useState } from 'react'
import './Login.css'
import {useDispatch} from 'react-redux'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addUserDetails } from '../../../Store/UserAuth';
function Login() {
  const dispatch = useDispatch()
  const [input,setInput] = useState({
    email:"",
    password:""
  }) 
  const navigate = useNavigate()

 const handleChange = (e) => {
       setInput((prev)=>({
        ...prev,
        [e.target.name] :e.target.value
       }))
  }
  const sendRequest =async ()=>{
    const res = await axios.post('http://localhost:5000/login',{
         email:input.email,
         password:input.password
    },{ withCredentials: true }).then((res)=>{
      console.log("res : ",res)
      const result = res.data;
      dispatch(addUserDetails({name:result.user.fname,token:result.token}))
    })
  .catch((err)=>{
      console.log(err.message)
   })
    // console.log("res " ,res)
    // var data = res.data;
    // return data;
  }
  const handleSubmit =(e)=>{
      e.preventDefault()
      sendRequest().then(()=>{
         navigate('/home')
      })
      console.log(input)
  }
  return (
    <MDBContainer fluid className='loginbody'>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
         <form >
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' name='email' value={input.email} onChange={handleChange} labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' name='password' value={input.password} onChange={handleChange} labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg"/>

              <p className="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
              <MDBBtn outline className='mx-2 px-5' color='white' size='lg' onClick={handleSubmit}>
                Login
              </MDBBtn>

              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size="lg"/>
                </MDBBtn>
              </div>

              <div>
                <p className="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold" onClick={()=>navigate('/signup')}>Sign Up</a></p>

              </div>
            </MDBCardBody>
          </MDBCard>
          </form>
        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Login;
