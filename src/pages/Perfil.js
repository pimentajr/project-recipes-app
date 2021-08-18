import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/Perfil.css';

function Perfil() {
  const headerProps = {
    title: 'Perfil',
    enableSearchButton: false,
    enableProfileButton: true,
  };

  const email = JSON.parse(localStorage.getItem('user'));
  console.log(email);

  return (
    <div className="perfil-page">
      <Header props={ headerProps } />
      <h1
        className="header-email"
        data-testid="profile-email"
      >
        {email ? email.email : ''}
      </h1>
      <Link className="link-btn" to="/receitas-feitas">
        <button className="btn-done-recipes" type="button" data-testid="profile-done-btn">
          Receitas Feitas
        </button>
      </Link>
      <Link className="link-btn" to="/receitas-favoritas">
        <button
          className="btn-favorite-recipes"
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link className="link-btn" to="/">
        <button
          className="btn-exit"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
      </Link>
      <img className="logo-image" alt="logo" src="http://localhost:3000/static/media/foodLogo.9b5ccf4c.png" />
      <Footer />
    </div>
  );
}

export default Perfil;
