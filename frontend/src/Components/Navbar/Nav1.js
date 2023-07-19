import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../Store/UserAuth';
import { useCookies } from 'react-cookie';
// import NavDropdown from 'react-bootstrap/NavDropdown';
function Nav1() {
  const dispatch = useDispatch()
  const user = useSelector ((state)=>state.user.userName)
  console.log("user :" , user)
  const navigate = useNavigate()
  const[cookie,setCookie,removeCookie]=useCookies(['jwt'])

  const handleLogout = ()=>{
      removeCookie('jwt')
      dispatch(userLogout())
      navigate('/')
  }
  
  return (
    <div>
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand >{user}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
         
        </Nav>
        <Nav>
          {/* <Nav.Link>{user}</Nav.Link> */}
          <Nav.Link onClick={()=>navigate('/profile')}> Profile </Nav.Link>
          <Nav.Link onClick={handleLogout}>
             Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    </div>
  )
}

export default Nav1;
