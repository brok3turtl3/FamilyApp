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
		<section  className='homepage'>
			<section className='profile-overlay'>
				<section className='profile-container'>
					{profile === null ? (
						<Hourglass />
					) : (
						<Fragment>
							<div className="profile-banner">
							{profile.image !== null ? (
							<div className="profile-img">
							<img src={`${profile.image}`} alt="Placeholder"></img>
							</div>) : null}
    <p>{profile.user.name}'s Profile</p>
  </div>
    <div className="profile-info">
      <div className="profile-info-section">
        <fieldset>
          <legend>GENERAL INFORMATION</legend>
        <p>City: {profile.city}</p>
        <p>Birthday: {profile.dob.substring(0,10)}</p>
        <p>Interests: {profile.interests}</p>
        
      </fieldset>
      </div>
      <div className="profile-info-section">
        <fieldset>
          <legend>WORK AND EDUCATION</legend>
        <p>Company: {profile.work?.company !== undefined ? (<Fragment>{profile.work.company}</Fragment>) : null}</p>
        <p>Position: {profile.work?.position !== undefined ? (<Fragment>{profile.work.position}</Fragment>) : null}</p>
        <p>School: {profile.education?.school !== undefined ? (<Fragment>{profile.education.school}</Fragment>) : null}</p>
        <p>Program: {profile.education?.program !== undefined ? (<Fragment>{profile.education.program}</Fragment>) : null}</p>
      </fieldset>
      </div>
      <div className="profile-info-section">
        <fieldset>
          <legend>BIO</legend>
        <p>{profile.bio}</p>
        
      </fieldset>
      </div>
      <div className="profile-info-section">
        <fieldset>
          <legend>SOCIALS</legend>
        <p>Facebook: {profile.social?.facebook !== undefined ? (<Fragment>{profile.social.facebook}</Fragment>) : null}</p>
        <p>Instagram: {profile.social?.instagram !== undefined ? (<Fragment>{profile.social.instagram}</Fragment>) : null}</p>
        <p>Twitter: {profile.social?.twitter !== undefined ? (<Fragment>{profile.social.twitter}</Fragment>) : null}</p>
      </fieldset>
      </div>

    </div>
							

							
							
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
