import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const ProfileForm = props => {

  const [formData, setFormData] = useState({
		city: '',
		bio: '',
		company: '',
		position: '',
    school: '',
    program: '',
    interests: '',
    dob: '',
    facebook: '',
    instagram: '',
    twitter: ''
	});

  const {
    city,
		bio,
		company,
		position,
    school,
    program,
    interests,
    dob,
    facebook,
    instagram,
    twitter
  } = formData;


  return (
    <Fragment>
    <div>This is where profile info will be collected</div>
    </Fragment>
  )
}

ProfileForm.propTypes = {}

export default connect()(ProfileForm)