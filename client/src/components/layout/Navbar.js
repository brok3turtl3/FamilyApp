import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { getPosts } from '../../actions/post';
import { PropTypes } from 'prop-types';
import './Navbar.css';

import {
	deleteNotification,
	updateNotifications,
} from '../../actions/notifications';

const Navbar = ({
	auth: { isAuthenticated, loading },
	notifications: { notifications },
	logout,
	deleteNotification,
	updateNotifications,
	getPosts
}) => {
	const navigate = useNavigate();

	useEffect(() => {
		const interval = setInterval(() => {
			updateNotifications();
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	const [showNotifications, setshowNotifications] = useState();

	const handleBellClick = () => {
		setshowNotifications(!showNotifications);
	};

	const authLinks = (
		<Fragment>
			<ul>
				<li>
					<Link to='/homepage'>Homepage</Link>
				</li>
				<li>
					<Link to='/profiles'>Profiles</Link>
				</li>
				<li>
					<Link to='/posts'>Posts</Link>
				</li>
				<li>
					<Link to='/bugs'>Feedback</Link>
				</li>
				<li>
					<a onClick={logout} href='#!'>
						Logout
					</a>
				</li>
				{notifications.length > 0 ? (
					<div className='notifications'>
						<i
							className='fa-solid fa-bell fa-shake hover'
							onClick={handleBellClick}
						></i>{' '}
						{notifications.length}
					</div>
				) : null}
			</ul>
			<div>
				{showNotifications && notifications.length > 0 && (
					<div className='notifications-display'>
						<p>Click to view post</p>
						{notifications.map((notification) => (
							<div
								key={notification._id}
								className='notification'
								onClick={() => {
									setshowNotifications(!showNotifications);
									navigate(`/posts`);
									getPosts()

									deleteNotification(notification._id);
								}}
							>
								<a href={`#${notification.postId}`}>{`${notification.name} ${notification.type}`}{' '}</a>
							</div>
						))}{' '}
					</div>
				)}
			</div>
		</Fragment>
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
	deleteNotification: PropTypes.func.isRequired,
	updateNotifications: PropTypes.func.isRequired,
	getPosts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	notifications: state.notifications,
});

export default connect(mapStateToProps, {
	logout,
	deleteNotification,
	updateNotifications,
	getPosts
})(Navbar);
