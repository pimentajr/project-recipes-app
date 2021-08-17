import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { randomDrinkId } from '../redux/actions/drinkActions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../ExplorebyFoodandDrink.css';

class ExploreDrinks extends Component {
  constructor() {
    super();

    this.redirectRandomDrink = this.redirectRandomDrink.bind(this);
  }

  async redirectRandomDrink() {
    const { randomDrinkIdResult, history } = this.props;
    const randomDrink = await randomDrinkIdResult();
    history.push(`/bebidas/${randomDrink}`);
  }

  render() {
    return (
      <div>
        <Header title="Explorar Bebidas" search={ false } />
        <div className="back-ground-drink">
          <div className="div-explore">
            <Link to="/explorar/bebidas/ingredientes">
              <Button
                variant="outline-dark"
                className="explore-buttons"
                type="button"
                data-testid="explore-by-ingredient"
              >
                Por Ingredientes
              </Button>
            </Link>
            <Button
              variant="outline-dark"
              className="explore-buttons"
              type="button"
              data-testid="explore-surprise"
              onClick={ this.redirectRandomDrink }
            >
              Me Surpreenda!
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  randomDrinkIdResult: () => dispatch(randomDrinkId()),
});

ExploreDrinks.propTypes = {
  randomDrinkIdResult: PropTypes.func,
  history: PropTypes.object,
}.isRequired;

export default connect(null, mapDispatchToProps)(ExploreDrinks);
