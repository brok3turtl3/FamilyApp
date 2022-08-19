import axios from 'axios';
import { setAlert } from './alert';
import { ADD_POST, GET_POSTS, POST_ERROR } from './types';

//GET ALL POSTS
export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/posts');

		dispatch({
			type: GET_POSTS,
			payload: res.data,
		});
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

//ADD POST
export const addPost = (formData) => async (dispatch) => {
	try {
		
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    
    const res = await axios.post('/api/posts', formData, config);

		dispatch({
			type: ADD_POST,
			payload: res.data,
		});

    dispatch(setAlert('Post Created', 'success'))
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
