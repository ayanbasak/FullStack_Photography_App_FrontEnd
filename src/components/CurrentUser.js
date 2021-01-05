import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../actions/securityActions";
import { Button, Col, Row, Container, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

class CurrentUser extends Component {
    componentDidMount() { }

    logout() {
        this.props.logout();
        window.location.href = "/";
    }
    render() {
        const { validToken, user } = this.props.security;

        const userIsAuthenticated = (
            <div>
                <ToggleButtonGroup type="checkbox" className="mb-2">
                    <ToggleButton style={{ backgroundColor: 'white', width: 150, marginTop: 25, marginBottom: 25 }}>
                        <Link to="/">
                            <i className="fas fa-user-circle mr-1" />
                            {user.fullName}
                        </Link>
                    </ToggleButton>
                    <ToggleButton style={{ backgroundColor: 'white', marginTop: 25, marginBottom: 25, marginRight: 100 }}>
                        <Link to="/logout" onClick={this.logout.bind(this)}>
                            Logout
                        </Link>
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        );

        const userIsNotAuthenticated = (
            <div>
                <ToggleButtonGroup type="checkbox" className="mb-2">
                    <ToggleButton style={{ backgroundColor: 'white', width: 150, marginTop: 25, marginBottom: 25 }}>
                        <Link to="/register">
                            Sign Up
                        </Link>
                    </ToggleButton>
                    <ToggleButton style={{ backgroundColor: 'white', marginTop: 25, marginBottom: 25, marginRight: 100 }}>
                        <Link to="/login">
                            Login
                        </Link>
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        );

        let headerLinks;

        if (validToken && user) {
            headerLinks = userIsAuthenticated;
        } else {
            headerLinks = userIsNotAuthenticated;
        }

        return (
            <div className="container col-8" >
                {headerLinks}
            </div>
        );
    }
}

CurrentUser.propTypes = {
    logout: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    security: state.security,
});

export default connect(mapStateToProps, { logout })(CurrentUser);
