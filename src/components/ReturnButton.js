import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../ReturnButton.css';

class ReturnButton extends Component {
  render() {
    const { history } = this.props;
    return (
      <button className="return-button" type="button" onClick={ () => history.goBack() }>
        {'<'}
      </button>
    );
  }
}

ReturnButton.propTypes = {
  history: PropTypes.func.isRequired,
};

export default withRouter(ReturnButton);
