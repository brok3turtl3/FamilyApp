import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Hourglass from '../layout/Hourglass';
import { getProfileById } from '../../actions/profile';

const Profile = ({ getProfileById, profile: { profile }, auth }) => {
	const { id } = useParams();

	useEffect(() => {
		getProfileById(id);
	}, [getProfileById, id]);

	return (
		<section className='background'>
			<section className='dark-overlay'>
				<section className='homepage-container'>
					{profile === null ? (
						<Hourglass />
					) : (
						<Fragment>
							<h1>{profile.user.name}'s page!</h1>
							<p>{profile.city}</p>
							<p>{profile.bio}</p>
							
						</Fragment>
					)}
				</section>
			</section>
		</section>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
