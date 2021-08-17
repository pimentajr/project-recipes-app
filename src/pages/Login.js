import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function Login() {
  const [isDisabled, setIsDisable] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleOnChangeInputValidate() {
    const correctEmailEntry = /(.*)@(.*).com/;
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const PasswordLength = 6;

    if (correctEmailEntry.test(email.value) && password.value.length > PasswordLength) {
      setIsDisable(false);
      return;
    }
    setIsDisable(true);
  }

  function emailInputRender() {
    return (
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          data-testid="email-input"
          onChange={ () => handleOnChangeInputValidate() }
        />
      </FormGroup>

    );
  }

  function passwordInputRender() {
    return (
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          data-testid="password-input"
          onChange={ () => handleOnChangeInputValidate() }
        />
      </FormGroup>

    );
  }

  function ButtonLoginHandler() {
    const email = document.querySelector('#email');
    const emailObj = {
      email: email.value,
    };
    localStorage.user = JSON.stringify(emailObj);
    localStorage.mealsToken = 1;
    localStorage.cocktailsToken = 1;
    dispatch({ type: 'SEND_USER_EMAIL_TO_STORE', payload: email.value });
    history.push('/comidas');
  }

  function buttonLoginRender() {
    return (
      <Button
        id="button-login"
        data-testid="login-submit-btn"
        type="button"
        value="login"
        disabled={ isDisabled }
        onClick={ () => ButtonLoginHandler() }
      >
        Login
      </Button>
    );
  }

  return (
    <main className="main-login">
      <Form className="container-fluid container-login">
        <h1 className="header-menu">Receitas</h1>
        { emailInputRender() }
        { passwordInputRender() }
        { buttonLoginRender() }
      </Form>

    </main>
  );
}
