import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import rockGlass from '../images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import SendEmail from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.handleChangeState = this.handleChangeState.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.getEmailForLogin = this.getEmailForLogin.bind(this);
  }

  componentDidUpdate() {
    this.validateInput();
  }

  handleChangeState({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  getEmailForLogin() {
    const { dispatchSendEmail } = this.props;
    const { email } = this.state;
    dispatchSendEmail(email);
  }

  validateInput() {
    const { email, password, disabled } = this.state;
    const lengthNumberPassword = 6;
    const validateEmail = email.split('').includes('@')
      && email.split('.').includes('com');
    const verifyLengthPassword = password.length > lengthNumberPassword;
    if (validateEmail && verifyLengthPassword && disabled) {
      this.setState({
        disabled: false,
      });
    } else if ((!validateEmail || !verifyLengthPassword) && !disabled) {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div>
        <div className="meals">
          <span className="logo">App Recipes</span>
          <object
            className="rocksGlass"
            type="image/svg+xml"
            data={ rockGlass }
          >
            Glass
          </object>
          <div className="login-div">
            <label htmlFor="email">
              <input
                data-testid="email-input"
                className="input-login"
                type="email"
                name="email"
                placeholder="E-mail"
                value={ email }
                onChange={ this.handleChangeState }
              />
            </label>
            <label htmlFor="password">
              <input
                className="input-login"
                data-testid="password-input"
                type="password"
                name="password"
                placeholder="Senha"
                value={ password }
                onChange={ this.handleChangeState }
              />
            </label>
            <Link to="/comidas">
              <button
                disabled={ disabled }
                data-testid="login-submit-btn"
                type="button"
                className="button-login"
                onClick={ this.getEmailForLogin }
              >
                Entrar
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSendEmail: (emailInput) => dispatch(SendEmail(emailInput)),
});

Login.propTypes = {
  getEmailForLogin: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
