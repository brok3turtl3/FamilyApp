import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBugs } from '../../actions/bug';
import Hourglass from '../layout/Hourglass';
import IndividualBug from './IndividualBug';
import BugForm from './BugForm';
import './Bugs.css';

const Bugs = ({ getBugs, bug: { bugs, loading } }) => {
	useEffect(() => {
		getBugs();
	}, [getBugs]);

	return (
		<section className='background-'>
			<section className='posts-overlay'>
				<div className='posts-inner'>
					{loading ? (
						<Hourglass />
					) : (
						<Fragment>
							<div className='large'>Feedback</div>
							<p className='medium'>
								Tell me what you would like added or what is broken!
							</p>
							<BugForm />
							<div className='profiles'>
								{bugs.length > 0 ? (
									bugs.map((bug) => <IndividualBug key={bug._id} bug={bug} />)
								) : (
									<h4>No posts found...</h4>
								)}
							</div>
						</Fragment>
					)}
				</div>
			</section>
		</section>
	);
};

Bugs.propTypes = {
	getBugs: PropTypes.func.isRequired,
	bug: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	bug: state.bug,
});

export default connect(mapStateToProps, { getBugs })(Bugs);