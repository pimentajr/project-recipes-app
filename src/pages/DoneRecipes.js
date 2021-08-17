import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
// import '../FoodsAndDrinks.css';

export default class DoneRecipes extends Component {
  constructor() {
    super();
    this.state = {
      doneRecipes: [],
      filter: '',
    };
    this.saveState = this.saveState.bind(this);
  }

  componentDidMount() {
    this.saveState();
  }

  saveState() {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    this.setState({
      doneRecipes,
    });
  }

  filterButtons(getFilters) {
    this.setState({
      filter: getFilters,
    });
  }

  render() {
    const { doneRecipes, filter } = this.state;
    return (
      <div>
        <Header title="Receitas Feitas" search={ false } />
        <div className="div-category-filter">
          <Button
            size="sm"
            variant="outline-dark"
            className="category-buttons-filter"
            data-testid="filter-by-all-btn"
            onClick={ () => this.filterButtons('') }
          >
            All
          </Button>
          <Button
            size="sm"
            variant="outline-dark"
            className="category-buttons-filter"
            data-testid="filter-by-food-btn"
            onClick={ () => this.filterButtons('comida') }
          >
            Food
          </Button>
          <Button
            size="sm"
            variant="outline-dark"
            className="category-buttons-filter"
            data-testid="filter-by-drink-btn"
            onClick={ () => this.filterButtons('bebida') }
          >
            Drinks
          </Button>
        </div>
        {doneRecipes && doneRecipes.filter((item) => item.type.includes(filter))
          .map((item, index) => {
            if (item.type === 'comida') {
              return (
                <Card
                  key={ index }
                  style={ { width: '16rem' } }
                  className="done-recipes-card"
                >
                  <li>
                    <Link to={ `/comidas/${item.id}` }>
                      <Card.Img
                        variant="top"
                        height="200px"
                        width="300px"
                        data-testid={ `${index}-horizontal-image` }
                        src={ item.image }
                        alt="card-img"
                      />
                    </Link>
                    <Card.Body>
                      <Card.Title
                        className="done-recipe-title"
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        {`${item.area} - ${item.category}`}
                      </Card.Title>
                      <Card.Title
                        data-testid={ `${index}-horizontal-name` }
                      >
                        <Link to={ `/comidas/${item.id}` }>
                          {item.name}
                        </Link>
                      </Card.Title>
                      <Card.Title
                        data-testid={ `${index}-horizontal-done-date` }
                      >
                        {`Feita em: ${item.doneDate}`}
                      </Card.Title>
                      <Card.Title
                        data-testid={ `${index}-${item.tags[0]}-horizontal-tag` }
                      >
                        {item.tags[0]}
                      </Card.Title>
                      <Card.Title
                        data-testid={ `${index}-${item.tags[1]}-horizontal-tag` }
                      >
                        {item.tags[1]}
                      </Card.Title>
                      <ShareButton
                        test={ `${index}-horizontal-share-btn` }
                        id={ item.id }
                      />
                    </Card.Body>
                  </li>
                </Card>
              );
            }
            return (
              <Card
                style={ { width: '16rem' } }
                className="done-recipes-card"
                key={ index }
              >
                <li>
                  <Link to={ `/bebidas/${item.id}` }>
                    <Card.Img
                      variant="top"
                      height="200px"
                      width="300px"
                      data-testid={ `${index}-horizontal-image` }
                      src={ item.image }
                      alt="card-img"
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title
                      className="done-recipe-title"
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {item.alcoholicOrNot}
                    </Card.Title>
                    <Card.Title
                      data-testid={ `${index}-horizontal-name` }
                    >
                      <Link to={ `/bebidas/${item.id}` }>
                        {item.name}
                      </Link>
                    </Card.Title>
                    <Card.Title
                      data-testid={ `${index}-horizontal-done-date` }
                    >
                      {`Feita em: ${item.doneDate}`}
                    </Card.Title>
                    <ShareButton
                      test={ `${index}-horizontal-share-btn` }
                      id={ item.id }
                    />
                  </Card.Body>
                </li>
              </Card>
            );
          })}
      </div>
    );
  }
}
