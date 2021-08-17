import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../Header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showInput: false,
    };
    this.renderSearchBar = this.renderSearchBar.bind(this);
  }

  renderSearchButton() {
    return (
      <button
        className="button"
        onClick={ this.renderSearchBar }
        type="button"
      >
        <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
      </button>
    );
  }

  renderSearchBar() {
    this.setState(({ showInput }) => ({
      showInput: !showInput,
    }));
  }

  render() {
    const { title, search } = this.props;
    const { showInput } = this.state;
    return (
      <header className="header">
        <Link to="/perfil">
          <button type="button" className="button">
            <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
          </button>
        </Link>
        <h1
          data-testid="page-title"
          className="title-header"
        >
          { title }
        </h1>
        { search ? this.renderSearchButton() : '' }
        { showInput ? <SearchBar /> : '' }
      </header>
    );
  }
}

Header.propTypes = {
  location: PropTypes.Object,
}.isRequired;

export default withRouter(Header);
