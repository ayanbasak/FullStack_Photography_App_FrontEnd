import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { login } from "../../actions/securityActions";
import TextField from '@material-ui/core/TextField';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.setState({ username: "", password: "", errors: {} });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.setState({ username: "", password: "", errors: {} });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const LoginRequest = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.login(LoginRequest);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login" style={{ width: '100%', marginTop: 25 }}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto" >

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextField
                    style={{ width: 400 }}
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.username,
                    })}
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    variant="outlined"
                    margin="normal"
                    required fullWidth
                    id="username"
                    label="Email Address"
                    autoFocus />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
                <div className="form-group">
                  <TextField
                    style={{ width: 400 }}
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    variant="outlined"
                    margin="normal"
                    required fullWidth
                    id="password"
                    label="Password"

                    autoFocus />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <input type="submit" className="btn btn-primary btn-block mt-4" style={{ width: 400 }} />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});

export default connect(mapStateToProps, { login })(Login);
