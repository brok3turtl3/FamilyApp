import axios from 'axios';
import { setAlert } from './alert';
import {
	ADD_BUG,
	DELETE_BUG,
	GET_BUGS,
	BUG_ERROR,
	GET_BUG,
	ADD_BUG_COMMENT,
	POST_ERROR
} from './types';

//GET ALL BUGS
export const getBugs = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/bugs');
console.log(res.data);
		dispatch({
			type: GET_BUGS,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: BUG_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

//GET INDIVIDUAL BUG

export const getBug = (bugId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/bugs/${bugId}`);

		dispatch({
			type: GET_BUG,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: BUG_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

//ADD BUG
export const addBug = (formData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post('/api/bugs', formData, config);

		dispatch({
			type: ADD_BUG,
			payload: res.data,
		});

		dispatch(setAlert('Post Created', 'success'));
	} catch (error) {
		dispatch({
			type: BUG_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

//DELETE BUG
export const deleteBug = (id) => async (dispatch) => {
	try {
		await axios.delete(`/api/bugs/${id}`);

		dispatch({
			type: DELETE_BUG,
			payload: id,
		});

		dispatch(setAlert('Post Removed', 'success'));
	} catch (error) {
		dispatch({
			type: BUG_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

//ADD COMMENT
export const addComment = (bugId, formData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post(`/api/bugs/comment/${bugId}`, formData, config);

		dispatch({
			type: ADD_BUG_COMMENT,
			payload: res.data,
		});

		dispatch(setAlert('Comment Added', 'success'));
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};





