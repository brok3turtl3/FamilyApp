import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteBug } from '../../actions/bug';
import Linkify from 'react-linkify';
import './IndividualBug.css';

const IndividualBug = ({
	deleteBug,

	auth,
	bug: { _id, subject, text, name, posterImage, user, comments, date, image },
}) => {

	const navigate = useNavigate();

	const navigateComments = () => {
		navigate(`/bugs/${_id}`);
	};


	return (
		<div className='bugs'>
			<div className='bug-subject'>
				
				
			<Link to={`/profile/${user}`}>
					<div className='post-img-thumb '>
						<img src={`${posterImage}?dontusecache`} alt='PH' className='profile-link'></img>
					</div>
				</Link>

				<div className="bug-poster-info">
					<div>{name}</div>
					<div>{date.substring(0, 10)}</div>
				</div>

				<div className="bug-delete">
					{!auth.loading && user === auth.user._id && (
						<Fragment>


						<i
							onClick={(e) => deleteBug(_id)}
							className='fa-solid fa-trash hover-danger'
						>
							{' '}
							X
						</i></Fragment>
					)}
				</div>
			</div>
			<Linkify
				componentDecorator={(decoratedHref, decoratedText, key) => (
					<a
						target='blank'
						style={{ color: 'yellow' }}
						href={decoratedHref}
						key={key}
					>
						{decoratedText}
					</a>
				)}
			>
				<div className='bug-body'>{text}</div>
			</Linkify>
			{image ? <img src={`${image}?dontusecache`} alt='ph'></img> : null}
			<div className='bug-buttons'>
			<span onClick={navigateComments}>
					<i className='fa-solid fa-comments likes hover'>
						{' '}
						<span className='fa'>Comments {comments.length}</span>
					</i>
				</span>
			</div>
		</div>
	);
};

IndividualBug.propTypes = {
	bug: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteBug: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteBug })(IndividualBug);
