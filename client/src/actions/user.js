import axios from 'axios';
import { setAlert } from './alert';
import { EDIT_USER_INFO } from './types';

export const editAccountInfo =
	({ name, email }) =>
	async (dispatch) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const body = JSON.stringify({ name, email });

		try {
			const res = await axios.put('api/users', body, config);
			dispatch({
				type: EDIT_USER_INFO,
				payload: res.data,
			});
		} catch (error) {
			const errors = error.response.data.errors;
			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
			}
		}
	};
