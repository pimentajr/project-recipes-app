import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

export default function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const validPasswordLength = 6;
    const validEmailFormat = /(.*)@(.*).com/;

    if (validEmailFormat.test(userEmail) && userPassword.length > validPasswordLength) {
      setIsSubmitButtonDisabled(false);
      return;
    }
    setIsSubmitButtonDisabled(true);
  }, [userEmail, userPassword]);

  function enteringApplication(event) {
    event.preventDefault();

    localStorage.mealsToken = 1;
    localStorage.cocktailsToken = 1;
    localStorage.user = JSON.stringify({ email: userEmail });

    history.push('/comidas');
  }

  return (
    <form onSubmit={ (event) => enteringApplication(event) }>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          name="email"
          id="email"
          value={ userEmail }
          onChange={ (event) => setUserEmail(event.target.value) }
          data-testid="email-input"
        />
      </label>

      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          id="password"
          value={ userPassword }
          onChange={ (event) => setUserPassword(event.target.value) }
          data-testid="password-input"
        />
      </label>

      <input
        type="submit"
        value="Entrar"
        disabled={ isSubmitButtonDisabled }
        data-testid="login-submit-btn"
      />
    </form>
  );
}
