import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { getProfiles } from '../../actions/profile'

const Profiles = ({
	getProfiles,
	profile: { profiles, loading },
}) => {

  useEffect(() => {
   getProfiles(); 
  }, [getProfiles])


  return (
    <section className='background'>
				<section className='dark-overlay'>
          <section className="profiles-container">
					<h1>PROFILES UNDER CONSTRUCTION</h1>
          <h1>TEST</h1>
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