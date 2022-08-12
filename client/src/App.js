import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from '../src/components/layout/Navbar';
import Landing from '../src/components/layout/Landing';
import Login from '../src/components/layout/Login';
import Register from '../src/components/layout/Register';
import Alert from '../src/components/layout/Alert';
import PrivateRoute from './utils/PrivateRoute';
import Homepage from './components/layout/homepage/Homepage';




//REDUX IMPORTS
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					
					<Navbar />
					<section className='sectionAlert'>
						<Alert />
						<Routes>
							<Route path='/' element={<Landing />} />
							<Route path='/register' element={<Register />} />
							<Route path='/login' element={<Login />} />
							<Route element={<PrivateRoute />}>
								<Route path='/homepage' element={<Homepage />} />
							</Route>
							
						</Routes>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
