import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from '../src/components/layout/Navbar';
import Landing from '../src/components/layout/Landing';
import Login from '../src/components/layout/Login';
import Register from '../src/components/layout/Register';
import Profile from '../src/components/layout/Profile';

//REDUX IMPORTS
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Routes>
						<Route path='/' element={<Landing />} />
						<Route path='/register' element={<Register />} />
						<Route path='/login' element={<Login />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='/profiles' element={<Profile />} />
					</Routes>
				</Fragment>
			</Router>
		</Provider>
	);
};
export default App;
