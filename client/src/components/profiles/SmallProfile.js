import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SmallProfile = ({
	profile: {
		user: { _id, name },
		city,
		bio,
	},
}) => {
	return (
		<div className='small-profile'>
			<h2>{name}</h2>
			<h1>{city}</h1>
			<p>{bio}</p>
			<Link to={`/profile/${_id}`} className='btn btn-primary'>
				Detailed Profile
			</Link>
		</div>
	);
};

SmallProfile.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default SmallProfile;
