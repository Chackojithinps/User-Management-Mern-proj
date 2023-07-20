import React, { useState } from 'react' 
import './Signup.css'
import axios from 'axios'
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBRow,
    MDBCol,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
const Signup =()=>{
        const [input, setInput] = useState({
            fname:"",
            lname:"",
            email:"",
            password:""
        })
        const navigate = useNavigate()
        const handleChange=(e)=>{
            setInput((prev)=>({
                ...prev,
                [e.target.name] : e.target.value
            }))
            // console.log(`${e.target.name} value ${e.target.value}`)
        }
        const sendReq = async()=>{
            const res = await axios.post('http://localhost:5000/api/signup',{
                fname:input.fname,
                lname:input.lname,
                email:input.email,
                password:input.password
            }).catch((err)=>{
                console.log("err: ",err.message)
            })
           console.log("res : ",res)
          

        }
        const handleSubmit =(e)=>{
             e.preventDefault();
             console.log("input : ",input)
            sendReq().then(()=>{
                navigate('/login')
            })
        }
        return (
            <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden mystyling'>
        
              <MDBRow>
        
                <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
        
                  <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
                    The best offer <br />
                    <span style={{color: 'hsl(218, 81%, 75%)'}}>for your business</span>
                  </h1>
        
                  <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                    quibusdam tempora at cupiditate quis eum maiores libero
                    veritatis? Dicta facilis sint aliquid ipsum atque?
                  </p>
        
                </MDBCol>
        
                <MDBCol md='6' className='position-relative'>
                  <form>
                  <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                  <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
              
                  <MDBCard className='my-5 bg-glass'>
                    <MDBCardBody className='p-5'>
        
                      <MDBRow>
                        <MDBCol col='6'>
                          <MDBInput wrapperClass='mb-4' label='First name' id='form1' onChange={handleChange} value={input.fname} name='fname' type='text'/>
                        </MDBCol>
        
                        <MDBCol col='6'>
                          <MDBInput wrapperClass='mb-4' label='Last name' id='form2' onChange={handleChange} value={input.lname} name='lname' type='text'/>
                        </MDBCol>
                      </MDBRow>
        
                      <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' onChange={handleChange} name='email' value={input.email}/>
                      <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' onChange={handleChange} name='password' value={input.password}/>
        
                      <div className='d-flex justify-content-center mb-4'>
                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                      </div>
        
                      <MDBBtn className='w-100 mb-4' size='md' onClick={handleSubmit}>sign up</MDBBtn>
                   

                      <div className="text-center">
        
                        <p>already a user? <Link to="/">Login</Link></p>
        
                        <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                          <MDBIcon fab icon='facebook-f' size="sm"/>
                        </MDBBtn>
        
                        <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                          <MDBIcon fab icon='twitter' size="sm"/>
                        </MDBBtn>
        
                        <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                          <MDBIcon fab icon='google' size="sm"/>
                        </MDBBtn>
        
                        <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                          <MDBIcon fab icon='github' size="sm"/>
                        </MDBBtn>
        
                      </div>
        
                    </MDBCardBody>
                  </MDBCard>
                  </form>
                </MDBCol>
        
              </MDBRow>
        
            </MDBContainer>
          );
}
export default Signup