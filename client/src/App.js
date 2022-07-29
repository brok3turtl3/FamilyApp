import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from '../src/components/layout/Navbar';
import Landing from '../src/components/layout/Landing';
import Login from '../src/components/layout/Login';
import Register from '../src/components/layout/Register';

const App = () => {
  return (
<Router>
<Fragment>
 <Navbar />
 <Routes>
<Route path="/" element={ <Register /> } />
  </Routes> 
  
</Fragment>
</Router>
  )
};
export default App;
