import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class ExplorarBebidas extends Component {
  async surpriseMe() {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const responseJson = await response.json();
    window.location.href = `/bebidas/${responseJson.drinks[0].idDrink}`;
  }

  render() {
    return (
      <div>
        <Header title="Explorar Bebidas" />
        <div className="profile-buttons" style={ { display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '50vh' } }>
          <Link to="/explorar/bebidas/ingredientes">
            <button type="button" data-testid="explore-by-ingredient">
              Por Ingredientes
            </button>
          </Link>
          <button onClick={ this.surpriseMe } type="button" data-testid="explore-surprise">
            Me Surpreenda!
          </button>
        </div>
        <Footer />
      </div>
    );
  }
}
