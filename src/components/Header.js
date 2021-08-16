import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSearchsFromApi } from '../actions';
// import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showInput: false,
      input: '',
      radio: '',
    };
    this.handleStateOnClick = this.handleStateOnClick.bind(this);
    this.handleStateOnChange = this.handleStateOnChange.bind(this);
    this.callApi = this.callApi.bind(this);
  }

  handleStateOnClick() {
    const { showInput } = this.state;
    this.setState({
      showInput: !showInput,
    });
  }

  handleStateOnChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async callApi() {
    const { input, radio } = this.state;
    const { typeFood, fetchSearchFilters, updateItemsToRender } = this.props;
    if (radio === 'first-letter' && input.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      await fetchSearchFilters(typeFood, input, radio);
      updateItemsToRender(true);
    }
  }

  render() {
    const { title, showSearchButton } = this.props;
    const { showInput } = this.state;
    return (
      <div>
        <header
          className="header"
        >
          <Link to="/perfil">
            <button
              type="button"
              className="profile-button"
            >
              {/* <img data-testid="profile-top-btn" src={ profileIcon } alt="profile" /> */}
              <i className="far fa-user-circle" />
            </button>
          </Link>
          <h3 data-testid="page-title">{ title }</h3>
          {showSearchButton && (
            <button
              type="button"
              onClick={ this.handleStateOnClick }
              className="search-button"
            >
              {/* <img data-testid="search-top-btn" src={ searchIcon } alt="search" /> */}
              <i className="fas fa-search" />
            </button>)}
        </header>
        { showInput
          ? (
            <div className="form-search">
              <label htmlFor="search">
                <input
                  className="searcher"
                  name="input"
                  type="text"
                  data-testid="search-input"
                  onChange={ (event) => this.handleStateOnChange(event) }
                />
              </label>
              <br />
              <div className="radio-buttons">
                <label htmlFor="radio">
                  <input
                    className="radio-button"
                    value="ingredient"
                    name="radio"
                    data-testid="ingredient-search-radio"
                    type="radio"
                    onChange={ (event) => this.handleStateOnChange(event) }
                  />
                  Ingrediente
                </label>

                <label htmlFor="radio">
                  <input
                    className="radio-button"
                    value="name"
                    name="radio"
                    data-testid="name-search-radio"
                    type="radio"
                    onChange={ (event) => this.handleStateOnChange(event) }
                  />
                  Nome
                </label>
                <label htmlFor="radio">
                  <input
                    className="radio-button"
                    value="first-letter"
                    name="radio"
                    data-testid="first-letter-search-radio"
                    type="radio"
                    onChange={ (event) => this.handleStateOnChange(event) }
                  />
                  Primeira Letra
                </label>
              </div>
              <button
                data-testid="exec-search-btn"
                type="button"
                className="button-search-input"
                onClick={ (event) => this.callApi(event) }
              >
                Buscar
              </button>
            </div>
          ) : <div />}
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  fetchSearchFilters:
    (mealsOrDrinks, input, radio) => (
      dispatch(getSearchsFromApi(mealsOrDrinks, input, radio))),
});

export default connect(null, mapDispatchToProps)(Header);
