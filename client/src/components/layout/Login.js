import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Alert from '../layout/Alert'

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;
	const navigate = useNavigate();

	

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		login(email, password);
	};

	//REDIRECT IF LOGGED IN
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/homepage');
		}
	});

	return (
		<Fragment>
			<section className="homepage">
				<section className="dark-overlay">
					<section className="auth-container">
						<form className="auth-form" onSubmit={handleSubmit}>
							<p className="medium">Please enter your email and password to login.</p>

							<input
								name="email"
								id="login-email"
								type="email"
								value={email}
								placeholder="Email Address"
								onChange={handleChange}
								required
							/>

							<input
								name="password"
								id="login-password"
								type="password"
								value={password}
								placeholder="Password"
								onChange={handleChange}
								required
							/>
							<p className='center-text'>Forgot Password?<Link to="/password-reset">Click here</Link></p>

<div className='auth-button'>
							<button className='btn btn-primary' type='submit'>
								Submit
							</button>
							</div>
						</form>
						<p>Need an account?<Link to="/register"> Register here</Link></p>
						<Alert />
					</section>
				</section>
			</section>
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, login })(Login);
