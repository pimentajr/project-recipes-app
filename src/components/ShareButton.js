import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

class ShareButton extends Component {
  constructor() {
    super();

    this.state = {
      clipboardMessage: false,
    };
  }

  clipBoard() {
    const { id } = this.props;
    copy(`http://localhost:3000/comidas/${id}`);
    this.setState({
      clipboardMessage: true,
    });
  }

  render() {
    const { clipboardMessage } = this.state;
    const { test } = this.props;
    return (
      <>
        <p>{ clipboardMessage ? 'Link copiado!' : '' }</p>
        <button
          className="button"
          type="button"
          onClick={ () => this.clipBoard() }
        >
          <img
            data-testid={ test }
            src={ shareIcon }
            alt="share icon"
            width="120%"
          />
        </button>
      </>
    );
  }
}

ShareButton.propTypes = {
  id: PropTypes.string,
  test: PropTypes.string,
}.isRequired;

export default ShareButton;
