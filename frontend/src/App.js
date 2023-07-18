import { Route, Routes } from 'react-router-dom';
import './App.css';
// import Header from './Components/Header'
// import Signup from './Components/Signup'
// import Login from './Components/Login'
// import Welcome from './Components/Welcome';
// import User from './Components/User';
import UserRoute from './Routes/UserRoute';
import AdminRoute from './Routes/AdminRoute'
function App() {
  return (
    <div >
        <Routes>
          <Route path='/*' element={<UserRoute/>}/>
          <Route path='/admin/*' element={<AdminRoute/>}/>
{/* 
           <Route path='/' element={<Welcome/>} exact/>

           <Route path='/login' element={<Login/>}/>
           <Route path='signup' element={<Signup/>}/>
           <Route path='/home' element={<Welcome/>}/>
           <Route path='/user' element={<User/>} /> */}
        </Routes>
    </div>
  );
}

export default App;
