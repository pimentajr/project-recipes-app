import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const [email, setEmail] = useState('');
  const [antiLoop, setAntiLoop] = useState(false);
  if (localStorage.user && !antiLoop) {
    setEmail(JSON.parse(localStorage.user).email);
    setAntiLoop(true);
  }
  return (
    <main>
      <Header haveSearchBtn={ false } title="Perfil" />
      <div>
        <p data-testid="profile-email">{ email }</p>
      </div>
      <div>
        <Link to="/receitas-feitas">
          <button type="button" data-testid="profile-done-btn">
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button type="button" data-testid="profile-favorite-btn">
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
          >
            Sair
          </button>
        </Link>
      </div>
      <Footer />
    </main>
  );
}
