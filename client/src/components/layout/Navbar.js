import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { PropTypes } from 'prop-types';
import { DELETE_NOTIFICATION } from '../../actions/types';
import { deleteNotification } from '../../actions/notifications';


const Navbar = ({ auth: { isAuthenticated, loading }, notifications : { notifications}, logout, deleteNotification }) => {

	const navigate = useNavigate();

	const [showNotifications, setshowNotifications] = useState();

	const handleBellClick = () => {
		setshowNotifications(!showNotifications);
		console.log(showNotifications);
	}

	const handleNotificationClick = (_id) => {
navigate(`/posts/${_id}`)
	}

	const authLinks = (
		<ul>
			<li>
				<Link to='/homepage'>Homepage</Link>
			</li>
			<li>
				<Link to="/profiles">Profiles</Link>
			</li>
			<li>
				<Link to="/posts">Posts</Link>
			</li>
			<li>
				<Link to="/bugs">Feedback</Link>
			</li>
			<li>
				<a onClick={logout} href='#!'>
					Logout
				</a>
			</li>{showNotifications && notifications.length > 0 && (
					<div className='notifications-display'>
						{' '}
						{notifications.map((notification) => (
							<div key={notification.id} className="notification hover" onClick={() => {
								setshowNotifications(!showNotifications);
								navigate(`/posts/${notification.postId}`);
						deleteNotification(notification._id);
						}}>{`${notification.name} ${notification.type}`} </div>
						))}{' '}
					</div>
				)}
			{ notifications.length > 0 ? <div className="notifications"><i className="fa-solid fa-bell fa-shake hover" onClick={handleBellClick}></i> {notifications.length}</div> : null }
			
			
		</ul>
	);

	const guestLinks = (
		<ul>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	);

	

	return (
		<nav className='navbar'>
			<div className='logo'>
			<h1>
				<Link to='/'>
					<i className='fa-solid fa-users'></i> Family Matters
				</Link>
			</h1>
</div>
<div className='nav-links'>
			{!loading && (
				<Fragment> {isAuthenticated ? authLinks : guestLinks} </Fragment>
			)}
		</div>
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	deleteNotification: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	notifications: state.notifications
});

export default connect(mapStateToProps, { logout, deleteNotification })(Navbar);
