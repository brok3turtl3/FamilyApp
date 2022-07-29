import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from '../src/components/layout/Navbar';
import Landing from '../src/components/layout/Landing';

const App = () => {
  return (
<Router>
<Fragment>
 <Navbar />
 <Routes>
<Route path="/" element={ <Landing /> } />
  </Routes> 
  
</Fragment>
</Router>
  )
};
export default App;
