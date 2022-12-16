import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import bug from './bug';
import notifications from './notifications';
import images from './images';

export default combineReducers({
	alert,
	auth,
	profile,
	post,
	bug,
	notifications,
	images
});
