import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';


const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
	let navigate = useNavigate();
	return !isAuthenticated && !loading ? navigate('/') : <Outlet /> 
};

PrivateRoute.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
