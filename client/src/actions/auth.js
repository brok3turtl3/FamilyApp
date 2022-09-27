import axios from 'axios';
import { setAlert } from './alert';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE,
	CLEAR_NOTIFICATIONS,
	GET_NOTIFICATIONS
} from './types';

import setAuthToken from '../utils/setAuthToken';

//LOAD USER
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
		console.log("here is response data")
		console.log(res.data.notifications);
		dispatch({
			type: GET_NOTIFICATIONS,
			payload: res.data.notifications
		})

		
	} catch (error) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

//REGISTER NEW USERS
export const register =
	({ name, email, password, profilePic }) =>
	async (dispatch) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const body = JSON.stringify({ name, email, password, profilePic });

		try {
			const res = await axios.post('/api/users', body, config);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
			dispatch(loadUser());
		} catch (error) {
			const errors = error.response.data.errors;
			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
			}

			dispatch({
				type: REGISTER_FAIL,
			});
		}
	};

//LOGIN USER
export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post('/api/auth', body, config);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());
		
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

//LOGOUT USER
export const logout = () => (dispatch) => {
	dispatch({ type: CLEAR_PROFILE});
	dispatch({ type: CLEAR_NOTIFICATIONS});
	dispatch({ type: LOGOUT });
	
};
