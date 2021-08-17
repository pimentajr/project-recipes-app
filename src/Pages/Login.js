import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkEmailAndPass = (e, p) => {
    const validEmail = /^[a-zA-Z]+@[a-zA-Z]+\.[com]{3,}$/i;
    const passLength = 7;
    return validEmail.test(e) && p.length >= passLength;
  };

  const setLocalStorage = (emailUser) => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email: emailUser }));
  };

  return (
    <form className="form-inline">
      <div className="form-group">
        <label htmlFor="email-input">
          Email:
          <input
            className="form-control mx-sm-3"
            aria-describedby="passwordHelpInline"
            type="email"
            data-testid="email-input"
            id="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>

        <label htmlFor="password-input">
          Senha:
          <small id="passwordHelpInline" className="text-muted">
            Deve ter no minimo 6 caracteres.
          </small>
          <input
            className="form-control mx-sm-3"
            aria-describedby="passwordHelpInline"
            type="password"
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
          />

        </label>
        <Link to="/comidas">
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ email && password ? !(checkEmailAndPass(email, password)) : true }
            onClick={ () => setLocalStorage(email) }
            className="btn btn-success"
          >
            Entrar
          </button>
        </Link>
      </div>
    </form>
  );
}

export default Login;
