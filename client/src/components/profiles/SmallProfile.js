import React from 'react';
import PropTypes from 'prop-types';
import './SmallProfile.css'
import { Link } from 'react-router-dom';

const SmallProfile = ({
	profile: {
		user: { _id, name },
		image,
		city,
		smallBio,
	},
}) => {
	return (
		<div className='small-profile'>
{image !== null ? (
							<div className="profile-img">
							<img loading="lazy"  src={`${image}?dontusecache`} alt="Placeholder"></img>
							</div>) : null}
			<div className="sm-pr-info">
			<div className="sm-pr-field"><h2>{name}</h2></div>
			<div className="sm-pr-field"><h1>{city}</h1></div>
			<div className="sm-pr-field"><p>{smallBio}</p></div>
			<Link to={`/profile/${_id}`} className='btn'>
				Detailed Profile
			</Link>
			
		</div>
		</div>
	);
};

SmallProfile.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default SmallProfile;
