import React from 'react';

import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

export default function Profile() {
  return (
    <div>
      <Header pageTitle="Perfil" itHasNotSearchButton />
      <Footer />
    </div>
  );
}
