import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { executeFoodSearch, updateQuery, executeDrinkSearch,
  updateSelectedFilter } from '../redux/actions/searchBarActions';
import { foodListSuccess } from '../redux/actions/foodActions';
import { drinkListSuccess } from '../redux/actions/drinkActions';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      food: false,
    };
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.checkResults = this.checkResults.bind(this);
  }

  componentDidMount() {
    this.checkHistory();
  }

  async handleSearchClick() {
    const { query, selectedFilter, executeSearchFoodAction,
      executeSearchDrinkAction } = this.props;
    const { food } = this.state;
    if (selectedFilter === 'firstLetter' && query.length !== 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    }
    if (food) {
      await executeSearchFoodAction(query, selectedFilter);
    } else {
      await executeSearchDrinkAction(query, selectedFilter);
    }
    this.checkResults();
  }

  checkResults() {
    const { searchResults, history, saveFoodList, saveDrinkList } = this.props;
    const { food } = this.state;
    if (searchResults === null) {
      console.log(searchResults);
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return;
    } if (searchResults.length === 1) {
      if (food) {
        history.push(`/comidas/${searchResults[0].idMeal}`);
      } else {
        history.push(`/bebidas/${searchResults[0].idDrink}`);
      }
      return;
    }
    if (food) {
      saveFoodList(searchResults);
    } else {
      saveDrinkList(searchResults);
    }
  }

  checkHistory() {
    const { history } = this.props;
    this.setState({
      food: history.location.pathname.includes('comidas'),
    });
  }

  render() {
    const { queryAction, selectedFilterAction, query, history } = this.props;
    console.log(history.location.pathname.includes('comidas'));
    return (
      <div>
        <input
          type="text"
          data-testid="search-input"
          placeholder="Faça sua pequisa"
          value={ query }
          onChange={ ({ target }) => queryAction(target.value) }
        />
        <label htmlFor="search-ingredient">
          <input
            name="filter"
            id="search-ingredient"
            value="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
            onChange={ () => selectedFilterAction('ingredient') }
          />
          Ingrediente
        </label>
        <label htmlFor="search-nome">
          <input
            name="filter"
            id="search-nome"
            value="name"
            type="radio"
            data-testid="name-search-radio"
            onChange={ () => selectedFilterAction('name') }
          />
          Nome
        </label>
        <label htmlFor="search-first-letter">
          <input
            name="filter"
            id="search-first-letter"
            value="firstLetter"
            type="radio"
            data-testid="first-letter-search-radio"
            onChange={ () => selectedFilterAction('firstLetter') }
          />
          Primeira Letra
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => this.handleSearchClick() }
        >
          Buscar
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  query: state.searchBarReducer.query,
  selectedFilter: state.searchBarReducer.selectedFilter,
  searchResults: state.searchBarReducer.searchResults,
});

const mapDispatchToProps = (dispatch) => ({
  queryAction: (query) => dispatch(updateQuery(query)),
  selectedFilterAction: (filter) => dispatch(updateSelectedFilter(filter)),
  executeSearchFoodAction: (query, filter) => dispatch(executeFoodSearch(query, filter)),
  executeSearchDrinkAction:
   (query, filter) => dispatch(executeDrinkSearch(query, filter)),
  saveFoodList: (results) => dispatch(foodListSuccess(results)),
  saveDrinkList: (results) => dispatch(drinkListSuccess(results)),
});

SearchBar.propTypes = {
  history: PropTypes.Object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBar));
