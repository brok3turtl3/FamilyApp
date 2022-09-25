import axios from 'axios';
import {
	ADD_NOTIFICATION,
	DELETE_NOTIFICATION,
	NOTIFICATION_ERROR,
	GET_NOTIFICATIONS,
	USER_LOADED
} from './types';

import setAuthToken from '../utils/setAuthToken';

//ADD NOTIFICATION

export const addNotification = (postId, type) => async (dispatch) => {
  console.log('Add Notification hit!')
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		await axios.post(
			`/api/users/addNotification/${postId}`,
			{ type },
			config
		);

  
	} catch (error) {
		dispatch({
			type: NOTIFICATION_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

//DELETE NOTIFICATION

export const deleteNotification = (notificationId) => async (dispatch) => {
	try {
		
		console.log("HIT!");
		await axios.delete(`/api/users/deleteNotification/${notificationId}`);

		dispatch({
			type: DELETE_NOTIFICATION,
			payload: notificationId,
		});

		
	} catch (error) {
		dispatch({
			type: NOTIFICATION_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

//UPDATE NOTIFICATIONS

export const updateNotifications = () => async (dispatch) => {
  console.log('Update Notifications hit!')

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
			type: NOTIFICATION_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};