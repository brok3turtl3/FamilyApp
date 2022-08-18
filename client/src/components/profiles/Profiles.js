import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Hourglass from '../layout/Hourglass';
import SmallProfile from './SmallProfile';

import { getProfiles } from '../../actions/profile'

const Profiles = ({
	getProfiles,
	profile: { profiles, loading },
}) => {

  useEffect(() => {
   getProfiles(); 
  }, [getProfiles]);


  return (
    <section className='background'>
				<section className='dark-overlay'>
          <section className="profiles-container">
					
          {loading ? (
        <Hourglass />
      ) : (
        <Fragment>
          <h1>Family</h1>
          <p>
            Here is everyone so far!
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <SmallProfile key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
          
          </section>
				</section>
			</section>
  )
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  
})

export default connect(mapStateToProps, { getProfiles })(Profiles)