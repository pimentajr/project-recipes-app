import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import FetchApi from '../services/ApiFetch';
import FoodDetailsCard from '../components/FoodDetailsCard';

export default function FoodsDetails(props) {
  const dispatch = useDispatch();
  const { match: { params: { id } } } = props;
  const [details, setDetails] = useState();
  const [mealIngredients, setMealIngredients] = useState();
  const [mealMeasure, setMealMeasure] = useState();

  useEffect(() => {
    async function fetchApi() {
      const results = await FetchApi('themealdb', null, null, ['details', id]);
      setDetails(results.meals);
    }
    fetchApi();
  }, []);

  useEffect(() => {
    if (details) {
      const ingredients = [];
      const measure = [];
      const obj = details[0];
      Object.keys(obj).forEach((item) => {
        if (item.includes('strIngredient')) {
          ingredients.push(obj[item]);
        }
        if (item.includes('strMeasure')) {
          measure.push(obj[item]);
        }
      });
      const filteredIngredients = ingredients
        .filter((item2) => (
          item2 !== ' ' && item2 !== '' && item2 !== null));
      setMealIngredients(filteredIngredients);
      const filteredMeasures = measure
        .filter((item2) => (
          item2 !== ' ' && item2 !== '' && item2 !== null));
      setMealMeasure(filteredMeasures);
      const teste = filteredMeasures;
      dispatch({
        type: 'SEND_FOOD_MEASURES_TO_STORE',
        payload: teste,
      });
    }
  }, [details]);

  return (
    <FoodDetailsCard
      mealIngredients={ mealIngredients }
      details={ details }
      mealMeasure={ mealMeasure }
      id={ id }
    />

  );
}

FoodsDetails.propTypes = {
  match: PropTypes.shape(Object).isRequired,
};
