import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';

class ExplorarComidasPorArea extends Component {
  constructor() {
    super();
    this.state = ({
      areas: [],
      recipesFromArea: [],
      selectedArea: '',
    });
    this.filterPerArea = this.filterPerArea.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchInnitialRecipes = this.fetchInnitialRecipes.bind(this);
  }

  componentDidMount() {
    this.fetchAreas();
    this.fetchInnitialRecipes();
  }

  handleChange({ target: { value } }) {
    this.setState({ selectedArea: value }, () => this.filterPerArea());
  }

  async fetchAreas() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const resInJson = await response.json();
    this.setState({
      areas: resInJson.meals,
    });
  }

  async fetchInnitialRecipes() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const resInJson = await response.json();
    this.setState({
      recipesFromArea: resInJson.meals,
    });
  }

  async filterPerArea() {
    const { selectedArea } = this.state;

    if (selectedArea !== 'All') {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`,
      );
      const resInJson = await response.json();
      this.setState({
        recipesFromArea: resInJson.meals,
      });
    } else this.fetchInnitialRecipes();
  }

  render() {
    const { areas, recipesFromArea } = this.state;

    return (
      <>
        <Header />
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ this.handleChange }
        >
          <option
            defaultValue
            data-testid="All-option"
          >
            All
          </option>
          {
            areas.map((area, index) => (
              <option
                data-testid={ `${area.strArea}-option` }
                value={ area.strArea }
                key={ index }
              >
                { area.strArea }
              </option>
            ))
          }
        </select>
        <Cards
          itemsToRender={ recipesFromArea }
          renderOneOrNot={ false }
          typeFood="food"
        />
        <Footer />
      </>
    );
  }
}

export default ExplorarComidasPorArea;
