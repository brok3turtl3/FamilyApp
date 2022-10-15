import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './EditAccountInfo.css';
import { editAccountInfo } from '../actions/user';
import { setAlert } from '../actions/alert';
import Alert from './layout/Alert';
import { useNavigate } from 'react-router-dom';



const EditAccountInfoForm = ({ editAccountInfo, auth, setAlert }) => {

const initialState = {
	name: auth.user.name,
	email: auth.user.email,
	email2: auth.user.email
};

let navigate = useNavigate();

	const [formData, setFormData] = useState(initialState);

	const { name, email, email2 } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if(formData === initialState){
			setAlert('No information has changed.', 'danger')
			navigate('/Homepage')
		}
		else if(email !== email2){
			setAlert('Emails do not match', 'danger');
		}else{
		editAccountInfo({name, email});
		setAlert('Account info changed.', 'success');
		navigate('/Homepage')
		}
	};

	return (
		<Fragment>
			<div className='homepage'>
				<div className='dark-overlay'>
					<div className='auth-container'>
						<form className='auth-form' onSubmit={handleSubmit}>
							
						<p className="medium">
								Please provide your new information. If you want a field to stay the same just leave it the way it is.
							</p>
							
							
							<Alert />
							<input
								type='text'
								name='name'
								value={name}
								placeholder={auth.user.name}
								onChange={handleChange}
							/>
							<input
								type='email'
								name='email'
								value={email}
								placeholder={auth.user.email}
								onChange={handleChange}
							/>
							<input
								type='email'
								name='email2'
								value={email2}
								placeholder={auth.user.email}
								onChange={handleChange}
							/>

<div className="edit-buttons">
<span>
							<div className='auth-button'>
								
							<button className='btn btn-primary' type='submit'>
								Homepage
							</button>
							</div>
							</span>	
							<span>
							<div className='auth-button'>
								
							<button className='btn btn-primary' type='submit'>
								Submit
							</button>
							</div>
							</span>	
</div>
						</form>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

EditAccountInfoForm.propTypes = {
	editAccountInfo: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	setAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { editAccountInfo, setAlert })(
	EditAccountInfoForm
);
