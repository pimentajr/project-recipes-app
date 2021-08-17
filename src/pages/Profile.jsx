import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

export default function Profile() {
  const [userEmail, setUserEmail] = useState();
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserEmail(user.email);
  }, [setUserEmail]);

  function logoutHandler() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header pageTitle="Perfil" itHasNotSearchButton />
      <h2 data-testid="profile-email">{ userEmail }</h2>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => logoutHandler() }
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}
