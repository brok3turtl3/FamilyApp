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
							{profile.work?.company !== undefined ? (<p>{profile.work.company}</p>) : null}
							{profile.work?.position !== undefined ? (<p>{profile.work.position}</p>) : null}
							{profile.education?.school !== undefined ? (<p>{profile.education.school}</p>) : null}
							{profile.education?.program !== undefined ? (<p>{profile.education.program}</p>) : null}
							{profile.social?.facebook !== undefined ? (<p>{profile.social.facebook}</p>) : null}
							{profile.social?.instagram !== undefined ? (<p>{profile.social.instagram}</p>) : null}
							{profile.social?.twitter !== undefined ? (<p>{profile.social.twitter}</p>) : null}
							
							
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
