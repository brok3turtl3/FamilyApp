import axios from 'axios';

import { ADD_IMAGES, GET_IMAGES, IMAGE_ERROR } from './types';

export const getImages = () => async (dispatch) => {
	try {
		const res = await axios.get(`/api/images`);
		console.log(res.data);

		dispatch({
			type: GET_IMAGES,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: IMAGE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.respose.status,
			},
		});
	}
};

export const addImages = (images) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const payload = {
			images: images,
		};

		const res = await axios.post(`/api/images`, payload, config);

		dispatch({
			type: ADD_IMAGES,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: IMAGE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.respose.status,
			},
		});
	}
};
