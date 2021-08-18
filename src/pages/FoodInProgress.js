import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FoodInProgressCard from '../components/FoodInProgressCard';
import { fetchFoodID } from '../redux/actions/foodActions';
import ReturnButton from '../components/ReturnButton';

class FoodInProgress extends Component {
  componentDidMount() {
    const { match: { params: { id } }, fetchFoodByID } = this.props;
    fetchFoodByID(id);
  }

  render() {
    return (
      <div>
        <ReturnButton />
        <FoodInProgressCard />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchFoodByID: (id) => dispatch(fetchFoodID(id)),
});

FoodInProgress.propTypes = {
  fetchFoodByID: PropTypes.func,
  match: PropTypes.object,
}.isRequire;

export default connect(null, mapDispatchToProps)(FoodInProgress);
