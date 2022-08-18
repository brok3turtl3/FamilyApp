import axios from 'axios';
import { setAlert } from './alert';
// import setAuthToken from '../utils/setAuthToken';

import { GET_PROFILE, PROFILE_ERROR, GET_PROFILES } from './types';

//ACTION TO RETRIEVE CURRENT USERS PROFILE
export const getCurrentProfile = () => async (dispatch) => {
	try {
		//TODO*** NOT SURE IF SETAUTHTOKEN IS REQUIRED HERE - NEED TO TEST
		// if (localStorage.token) {
		// 	setAuthToken(localStorage.token);
		// }

		const res = await axios.get('/api/profile/user');

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (error) {
		console.log('FAIL');
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

//GET DETAILED PROFILE BY ID
export const getProfileById = (userId) => async (dispatch) => {
	try {
		
		const res = await axios.get(`/api/profile/user/${userId}`);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.statusText, status: error.response.data },
		});
	}
};

//GET ALL PROFILES
export const getProfiles = () => async (dispatch) => {
	try {
		//TODO*** ADD CODE TO CLEAR ANY EXISTING PROFILE

		//TODO*** NOT SURE IF SETAUTHTOKEN IS REQUIRED HERE - NEED TO TEST
		// if (localStorage.token) {
		// 	setAuthToken(localStorage.token);
		// }

		const res = await axios.get('/api/profile');

		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		});
	} catch (error) {
		console.log('FAIL');
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

//ACTION TO CREATE OR UPDATE USER PROFILE
export const createProfile =
	(formData, edit = false) =>
	async (dispatch) => {
		try {
			// if (localStorage.token) {
			// 	setAuthToken(localStorage.token);
			// }

			//SET UP CONFIG AND BODY INFO FOR AXIOS CALL
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			//SEND POST REQUEST WITH INFO TO DB WITH AXIOS
			const res = await axios.post('/api/profile', formData, config);

			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
			dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));

			// TODO*** FIGURE OUT HOW TO RE_ROUTE FROM WITHIN ACTIONS

			return true;
		} catch (error) {
			const errors = error.response.data.errors;
			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
			}
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status,
				},
			});
		}
	};
