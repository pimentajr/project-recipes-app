import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserHook } from '../Context/UserHook';

function Login() {
  const { email, setEmail } = UserHook();
  const [password, setPassword] = useState('');
  const [disabled, setdisabled] = useState(true);

  function handleDisable() {
    const reg = /\S+@\S+\.\S+/;
    const min = 6;
    setdisabled(!(email.match(reg) && password.length >= min));
  }

  function handleSubmit() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  }

  return (
    <div className="loginContainer">
      <h4>App de Receitas</h4>
      <div className="inputForm">
        <h5>Login</h5>

        <label htmlFor="email-input">
          <input
            type="email"
            data-testid="email-input"
            placeholder="Email"
            onChange={ (e) => { setEmail(e.target.value); handleDisable(); } }
          />
        </label>
        <label htmlFor="password-input">
          <input
            type="password"
            data-testid="password-input"
            placeholder="Senha"
            onChange={ (e) => { setPassword(e.target.value); handleDisable(); } }
          />
        </label>
      </div>

      <Link to="/comidas">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ disabled }
          onClick={ () => handleSubmit() }
        >
          Entrar
        </button>
      </Link>
    </div>
  );
}

export default Login;
