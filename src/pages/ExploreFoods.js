import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { randomFoodId } from '../redux/actions/foodActions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../ExplorebyFood.css';

class ExploreFoods extends Component {
  constructor() {
    super();

    this.redirectRandomFood = this.redirectRandomFood.bind(this);
  }

  async redirectRandomFood() {
    const { randomFoodIdResult, history } = this.props;
    const randomFood = await randomFoodIdResult();
    history.push(`/comidas/${randomFood}`);
  }

  render() {
    return (
      <div>
        <Header title="Explorar Comidas" search={ false } />
        <div className="back-ground-food">
          <div className="div-explore">
            <Link to="/explorar/comidas/ingredientes">
              <Button
                type="button"
                data-testid="explore-by-ingredient"
                className="explore-buttons"
              >
                Por Ingredientes
              </Button>
            </Link>
            <Link to="/explorar/comidas/area">
              <Button
                className="explore-buttons"
                type="button"
                data-testid="explore-by-area"
              >
                Por Local de Origem
              </Button>
            </Link>
            <Button
              className="explore-buttons"
              type="button"
              data-testid="explore-surprise"
              onClick={ this.redirectRandomFood }
            >
              Me Surpreenda!
            </Button>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  randomFoodIdResult: () => dispatch(randomFoodId()),
});

ExploreFoods.propTypes = {
  randomFoodIdResult: PropTypes.func,
  history: PropTypes.object,
}.isRequired;

export default connect(null, mapDispatchToProps)(ExploreFoods);
