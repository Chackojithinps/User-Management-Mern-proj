import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Welcome from './Components/Welcome';

function App() {
  return (
    <div >
        <Routes>
        <Route path='/' element={<Welcome/>} exact/>

           <Route path='/login' element={<Login/>}/>
           <Route path='signup' element={<Signup/>}/>
        </Routes>
    </div>
  );
}

export default App;
