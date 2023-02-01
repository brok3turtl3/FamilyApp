import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Hourglass from '../layout/Hourglass';
import { getProfileById } from '../../actions/profile';
import BioInfo from './BioInfo';
import Images from './Images';
import Posts from './Posts';
import './Profile.css';

const Profile = ({ getProfileById, profile: { profile }, auth }) => {
	const { id } = useParams();
	const [activePage, setActivePage] = useState();

	useEffect(() => {
		getProfileById(id);
	}, [getProfileById, id]);

	return (
		<section className='homepage-'>
			<section className='profile-overlay'>
				<section className='profile-container margin-top'>
					{profile === null ? (
						<Hourglass />
					) : (
						<Fragment>
							<div className='profile-banner'>
								{profile.image !== null ? (
									<div className='profile-img'>
										<img
											src={`${profile.image}?dontusecache`}
											alt='Placeholder'
										></img>
									</div>
								) : null}
								<div className='profile-banner-info'>
									<p className='medium'>
										{profile.user.name}'s Profile
									</p>
									{profile.smallBio ? <p>{profile.smallBio}</p> : null}
								</div>
							</div>
							<br />
							<div className='profile-buttons'>
								<button
									className='btn'
									onClick={() => {
										setActivePage(<BioInfo profile={profile} />);
									}}
								>
									Bio Info
								</button>
								<button
									className='btn'
									onClick={() => {
										setActivePage(<Images id={id} />);
									}}
								>
									Images
								</button>
								<button
									className='btn'
									onClick={() => {
										setActivePage(<Posts id={id} />);
									}}
								>
									Posts
								</button>
							</div>
							<br />
							{activePage === undefined ? (
								<BioInfo profile={profile} />
							) : (
								activePage
							)}
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
	post: state.post,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
