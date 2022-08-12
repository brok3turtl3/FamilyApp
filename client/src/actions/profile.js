import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

import { GET_PROFILE, PROFILE_ERROR } from './types';

//ACTION TO RETRIEVE CURRENT USERS PROFILE
export const getCurrentProfile = () => async (dispatch) => {
	try {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		console.log('getCurrentProfile fired!');
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
