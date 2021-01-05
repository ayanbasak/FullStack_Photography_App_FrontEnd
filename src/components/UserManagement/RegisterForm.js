import React, { Component } from "react";
import { createNewUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import TextField from '@material-ui/core/TextField';

class RegisterForm extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      errors: {},
      errorEmail: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.errors.message) {
      this.setState({ errorEmail: nextProps.errors.message });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.createNewUser(newUser, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, errorEmail } = this.state;
    return (
      <div className="register" style={{ width: '100%', marginTop: 25 }}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextField
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.fullName,
                    })}
                    placeholder="Full Name"
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.onChange}
                    variant="outlined"
                    margin="normal"
                    required fullWidth
                    id="fullName"
                    label="Full Name"
                    autoFocus
                  />
                  {errors.fullName && (
                    <div className="invalid-feedback">{errors.fullName}</div>
                  )}
                </div>
                <div className="form-group">
                  <TextField
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errorEmail,
                    })}
                    placeholder="Email Address"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    variant="outlined"
                    margin="normal"
                    required fullWidth
                    id="username"
                    label="Email Address"
                    autoFocus
                  />
                  {errorEmail && (
                    <div className="invalid-feedback">{errorEmail}</div>
                  )}
                </div>
                <div className="form-group">
                  <TextField
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    variant="outlined"
                    margin="normal"
                    required fullWidth
                    id="password"
                    label="Your Password"
                    autoFocus
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <TextField
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.confirmPassword,
                    })}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                    variant="outlined"
                    margin="normal"
                    required fullWidth
                    id="confirmPassword"
                    label="Confirm Password"
                    autoFocus
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <input type="submit" className="btn btn-primary btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  security: state.security,
});
export default connect(mapStateToProps, { createNewUser })(RegisterForm);
