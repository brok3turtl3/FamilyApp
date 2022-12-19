import React, { Fragment } from 'react'

const BioInfo = ({profile}) => {




  return (
    <div className="profile-info">
      <div className="profile-info-section">
        <fieldset>
          <legend>GENERAL INFORMATION</legend>
        <p>City: {profile.city}</p>
        <p>Birthday: {profile.dob ? (<Fragment>{profile.dob.substring(0,10)}</Fragment>) : null}</p>
        <p>Interests: {profile.interests}</p>
        
      </fieldset>
      </div>
      <div className="profile-info-section">
        <fieldset>
          <legend>WORK / EDUCATION AND SMALL BIO</legend>
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
  )
}

export default BioInfo