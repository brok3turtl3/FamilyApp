import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;
	const navigate = useNavigate();

	const pstyles = {
		color: 'white',
		marginTop: '3rem',
	};

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
					<section className="login-container">
						<form className="login-form" onSubmit={handleSubmit}>
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

							<button className="btn btn-primary login-button" type="submit">Submit</button>
						</form>
						<p>Need an account?<a href="/register"> Register here</a></p>
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
