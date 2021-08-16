import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FetchApi from '../services/ApiFetch';
import DrinkDetailsCard from '../components/DrinkDetailsCard';

export default function DrinkDetails(props) {
  const { match: { params: { id } } } = props;
  const [details, setDetails] = useState();
  const [mealIngredients, setMealIngredients] = useState();
  const [mealMeasure, setMealMeasure] = useState();

  useEffect(() => {
    async function fetchApi() {
      const results = await FetchApi('thecocktaildb', null, null, ['details', id]);
      setDetails(results.drinks);
    }
    fetchApi();
  }, [id]);

  useEffect(() => {
    if (details) {
      const ingredients = [];
      const obj = details[0];
      Object.keys(obj).forEach((item) => {
        if (item.includes('strIngredient')) {
          ingredients.push(`${item}: ${obj[item]}`);
        }
      });
      const filteredIngredients = ingredients
        .map((item) => item.split(': ')[1]).filter((item2) => (
          item2 !== '' && item2 !== 'null'));
      setMealIngredients(filteredIngredients);
    }
  }, [details]);

  useEffect(() => {
    if (details) {
      const measure = [];
      const obj = details[0];
      Object.keys(obj).forEach((item) => {
        if (item.includes('strMeasure')) {
          measure.push(`${item}: ${obj[item]}`);
        }
      });
      const filteredMeasures = measure
        .map((item) => item.split(': ')[1]).filter((item2) => (
          item2 !== '' && item2 !== 'null'));
      setMealMeasure(filteredMeasures);
    }
  }, [details]);

  return (
    <DrinkDetailsCard
      mealIngredients={ mealIngredients }
      details={ details }
      mealMeasure={ mealMeasure }
      id={ id }
    />

  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape(Object).isRequired,
};
