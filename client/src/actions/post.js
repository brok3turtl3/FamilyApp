import axios from 'axios';
import { setAlert } from './alert';
import { taggedNotification } from './notifications';
import {
	ADD_POST,
	DELETE_POST,
	GET_POSTS,
	POST_ERROR,
	UPDATE_LIKES,
	UPDATE_LAUGHS,
	GET_POST,
	ADD_COMMENT,
	DELETE_COMMENT,
	EDIT_POST,
} from './types';

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

//GET INDIVIDUAL POST

export const getPost = (postId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/posts/${postId}`);

		dispatch({
			type: GET_POST,
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
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post('/api/posts', formData, config);
		// console.log(`This is the postId: ${res.data._id}`)

		//CHECK FORMDATA FOR ANY TAGGED USERS AND SEND NOTIFICATIONS
		if (formData.tagged.length > 0) {
			console.log('The array has this many' + formData.tagged[0]);
			for (let i = 0; i < formData.tagged.length; i++) {
				console.log('FOR LOOP HIT!');
				try {
					const config = {
						headers: {
							'Content-Type': 'application/json',
						},
					};

					await axios.post(
						`/api/users/taggedNotification/${res.data._id}`,
						{
							type: 'has mentioned you in a post!',
							userId: formData.tagged[i],
						},
						config
					);
				} catch (error) {
					console.log(error.message);
					// dispatch({
					// 	type: NOTIFICATION_ERROR,
					// 	payload: {
					// 		msg: error.response.statusText,
					// 		status: error.response.status,
					// 	},
					// });
				}
			}
		}

		dispatch({
			type: ADD_POST,
			payload: res.data,
		});

		dispatch(setAlert('Post Created', 'success'));
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

//EDIT POST
export const editPost = (postId, text) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put(`/api/posts/edit/${postId}`, text, config);

		dispatch({
			type: EDIT_POST,
			payload: res.data,
		});

		dispatch(setAlert('Post Edited', 'success'));
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

//DELETE POST
export const deletePost = (id) => async (dispatch) => {
	try {
		await axios.delete(`/api/posts/${id}`);

		dispatch({
			type: DELETE_POST,
			payload: id,
		});

		dispatch(setAlert('Post Removed', 'success'));
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

//ADD LIKE
export const addLike = (postId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/posts/like/${postId}`);
		dispatch({
			type: UPDATE_LIKES,
			payload: { postId, likes: res.data },
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

//REMOVE LIKE
export const removeLike = (postId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/posts/unlike/${postId}`);
		dispatch({
			type: UPDATE_LIKES,
			payload: { postId, likes: res.data },
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

//TOGGLE LIKE
export const toggleLike = (postId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/posts/toggle-like/${postId}`);
		dispatch({
			type: UPDATE_LIKES,
			payload: { postId, likes: res.data },
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

//TOGGLE LAUGH
export const toggleLaugh = (postId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/posts/toggle-laugh/${postId}`);
		dispatch({
			type: UPDATE_LAUGHS,
			payload: { postId, laughs: res.data },
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

//ADD COMMENT
export const addComment = (postId, formData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post(
			`/api/posts/comment/${postId}`,
			formData,
			config
		);

		dispatch({
			type: ADD_COMMENT,
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

//DELETE COMMENT
export const deleteComment = (postId, commentId) => async (dispatch) => {
	try {
		await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

		dispatch({
			type: DELETE_COMMENT,
			payload: commentId,
		});

		dispatch(setAlert('Comment Deleted', 'success'));
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
