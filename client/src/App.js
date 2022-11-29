import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from '../src/components/layout/Navbar';
import Landing from '../src/components/layout/Landing';
import Login from '../src/components/layout/Login';
import Register from '../src/components/layout/Register';
import PasswordReset from './components/PasswordReset';

import PrivateRoute from './utils/PrivateRoute';
import Homepage from './components/layout/homepage/Homepage';
import ProfileForm from './components/profiles/ProfileForm';
import Profiles from './components/profiles/Profiles';
import EditProfileForm from './components/profiles/EditProfileForm';
import Profile from './components/profiles/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import EditPostForm from './components/post/EditPostForm';
import Bugs from './components/bugs/Bugs';
import Bug from './components/bug/Bug';
import EditAccountInfoForm from './components/EditAccountInfoForm';



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
					
						
						<Routes>
							<Route path='/' element={<Landing />} />
							<Route path='/register' element={<Register />} />
							<Route path='/login' element={<Login />} />
							<Route path='/password-reset' element={<PasswordReset />} />
							<Route element={<PrivateRoute />}>
								<Route path='/homepage' element={<Homepage />} />
								<Route path='/profileform' element={<ProfileForm />} />
								<Route path='/profiles' element={<Profiles />} />
								<Route path='/editprofile' element={<EditProfileForm />} />
								<Route path='/profile/:id' element={<Profile />} />
								<Route path='/posts' element={<Posts />} />
								<Route path='/posts/:id' element={<Post />} />
								<Route path='/posts/edit/:id' element={<EditPostForm />} />
								<Route path='/bugs' element={<Bugs />} />
								<Route path='/bugs/:id' element={<Bug />} />
								<Route path='/editaccountinfo' element={<EditAccountInfoForm />} />

								
							</Route>
							
						</Routes>
					
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
