import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../actions/profile';

const Homepage = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, []);

	return loading && profile === null ? (
		<Fragment>
			<div>Homepage</div>
		</Fragment>
	) : (
		<Fragment>
			<section className='background'>
				<section className='dark-overlay'>
					<section className='homepage-container'>
					<h1>Welcome {user && user.name}</h1>
					<h1>A little bit about me: {profile && profile.bio}</h1>
					</section>
				</section>
			</section>
		</Fragment>
	);
};

Homepage.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Homepage);
