import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class ExplorarComidas extends Component {
  async surpriseMe() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const responseJson = await response.json();
    window.location.href = `/comidas/${responseJson.meals[0].idMeal}`;
  }

  render() {
    return (
      <div>
        <Header title="Explorar Comidas" />
        <div className="profile-buttons" style={ { display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '50vh' } }>
          <Link to="/explorar/comidas/ingredientes">
            <button type="button" data-testid="explore-by-ingredient">
              Por Ingredientes
            </button>
          </Link>
          <Link to="/explorar/comidas/area">
            <button type="button" data-testid="explore-by-area">
              Por Local de Origem
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
