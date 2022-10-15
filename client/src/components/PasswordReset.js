import { connect } from 'react-redux';
import React, { Fragment, useState } from 'react';
import { forgotPassword } from '../actions/auth';
import Alert from './layout/Alert';
import PropTypes from 'prop-types';
import { setAlert } from '../actions/alert';

const PasswordReset = ({forgotPassword}) => {
	const [email, setEmail] = useState();

	const handleChange = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email);
		forgotPassword(email);

	};

	return (
		<Fragment>
			<section className='homepage'>
				<section className='dark-overlay'>
					<section className='auth-container'>
						<form className='auth-form' onSubmit={handleSubmit}>
							<p className='medium'>
								Please enter your email and a reset link will be sent to you.
							</p>

							<input
								name='email'
								id='login-email'
								type='email'
								value={email}
								placeholder='Email Address'
								onChange={handleChange}
								required
							/>

							<div className='auth-button'>
								<button className='btn btn-primary' type='submit'>
									Submit
								</button>
							</div>
              <Alert />
						</form>

						<Alert />
					</section>
				</section>
			</section>
		</Fragment>
	);
};

PasswordReset.propTypes = {
	forgotPassword: PropTypes.func.isRequired,
};

export default connect(null, {forgotPassword})(PasswordReset);
