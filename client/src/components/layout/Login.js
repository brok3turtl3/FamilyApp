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
			navigate('/Homepage');
		}
	});

	return (
		<Fragment>
			<section className='background'>
				<section className='dark-overlay'>
					<section className='register-container'>
						<form className='register-form' onSubmit={handleSubmit}>
							<h3>Please enter your email and password to login.</h3>
							<div className='fields'>
								<div className='register-field'>
									<label htmlFor='register-email'>
										Email:
										<input
											name='email'
											id='register-email'
											type='email'
											placeholder='Email Address'
											value={email}
											onChange={handleChange}
											required
										/>
									</label>
								</div>
								<div className='register-field'>
									<label htmlFor='register-password'>
										Password:
										<input
											name='password'
											id='register-password'
											type='password'
											placeholder='Password'
											value={password}
											onChange={handleChange}
											required
										/>
									</label>
								</div>
							</div>
							<button className='btn' type='submit'>
								Submit
							</button>
						</form>
						<p style={pstyles}>
							Need an account?<Link to='/register'> Register here</Link>
						</p>
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
