import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import '../Explore-Profile.css';

export default class Explore extends Component {
  render() {
    return (
      <div>
        <Header title="Explorar" search={ false } />
        <div className="back-ground">
          <div className="div-explore">
            <Link to="/explorar/comidas">
              <Button
                variant="outline-secondary"
                data-testid="explore-food"
                className="explore-buttons"
              >
                Explorar Comidas
              </Button>
            </Link>
            <Link to="/explorar/bebidas">
              <Button
                variant="outline-secondary"
                data-testid="explore-drinks"
                className="explore-buttons"
              >
                Explorar Bebidas
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
