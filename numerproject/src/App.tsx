import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Bisection from './RootOfEquations/Bisection';
import Falsepos from './RootOfEquations/Falseposition';
import Onepoint from './RootOfEquations/Onepoint';
import Newton from './RootOfEquations/NewtonRaph';
import Secant from './RootOfEquations/Secant';
import GaussSeidel from './Linear/Guassseidel';
import Mullinear from './Regrssion/test';
import TokenForm from './component/token';

function App() {

  const [havetoken, setHavetoken] = useState(sessionStorage.getItem("token"))

  console.log(havetoken)

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      {havetoken==null && <TokenForm/>}
        {havetoken!=null && 
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/bisection" element={<Bisection/>} />
          <Route path="/falseposition" element={<Falsepos/>} />
          <Route path="/onepoint" element={<Onepoint/>} />
          <Route path="/newtonraphson" element={<Newton/>} />
          <Route path="/secant" element={<Secant/>} />
          <Route path="/gaussseidel" element={<GaussSeidel/>} />
          <Route path="/multilinear" element={<Mullinear/>} />
          <Route path="/token" element={<TokenForm/>} />
        </Routes>}
      </BrowserRouter>
    </div>
  );
}

export default App;
