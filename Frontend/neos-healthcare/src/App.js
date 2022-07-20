import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './components/home';
import { Login } from './components/login';
import { Navbar } from './components/navabar';
import { SignUp } from './components/signup';
import { UserHome } from './components/userHome';

function App() {
  
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/loginSuccessful' element={<UserHome />} />
      </Routes>
    </div>
  );
}

export default App;
