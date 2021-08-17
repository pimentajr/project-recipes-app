import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';
import { fetchFoodDetails, fetchDrinks } from '../services/API';
import '../styles/FoodsDetails.css';
import ingredientsDetails from '../helpers/ingredientsDetails';
import DrinksRecomendations from '../components/DrinksRecomendations';
import { getStorage } from '../helpers/Storage';
import ShareAndFavButtons from '../components/subcomponents/ShareAndFavButtons';

function FoodsDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({ id });
  const [recomendations, setRecomendations] = useState([]);
  const [doneRecipe, setDoneRecipe] = useState(false);
  const [inProgressRecipe, setInProgressRecipe] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const foodDetails = async (foodId) => {
      const fetchedDetails = await fetchFoodDetails(foodId);
      setDetails(fetchedDetails);
      setLoading(false);
    };
    foodDetails(id);
  }, [id, setLoading]);

  useEffect(() => {
    const drinksRecomendations = async () => {
      const fetchedRecomendations = await fetchDrinks();
      setRecomendations(fetchedRecomendations);
    };
    drinksRecomendations();
  }, []);

  useEffect(() => {
    const doneRecipes = getStorage('doneRecipes');
    doneRecipes.forEach((recipe) => { if (recipe.id === id) { setDoneRecipe(true); } });

    const { meals } = getStorage('inProgressRecipes');
    if (meals && Object.keys(meals).includes(id)) {
      setInProgressRecipe(true);
    }
  }, [id]);

  const ingredientsAndMeasures = details.idMeal
    ? ingredientsDetails(details)
    : [];

  function videoSrc(youtubeLink) {
    return youtubeLink.replace('watch?v=', 'embed/');
  }

  return (
    <div className="details-container">
      {loading ? (
        <ReactBootStrap.Spinner animation="border" />
      ) : (
        <>
          <img
            src={ details.strMealThumb }
            alt="Detalhe da comida"
            data-testid="recipe-photo"
          />
          <div className="details-header">
            <div>
              <span data-testid="recipe-title">{details.strMeal}</span>
              <span data-testid="recipe-category">{details.strCategory}</span>
            </div>
            <ShareAndFavButtons details={ details } />
          </div>
          <div className="ingredients-container">
            <span>Ingredients</span>
            <ul>
              {ingredientsAndMeasures.map((ingredient, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div className="instructions-container">
            <span>Instruções</span>
            <p data-testid="instructions">{details.strInstructions}</p>
          </div>
          <div className="video-container">
            <span>Video</span>
            <iframe
              data-testid="video"
              width="340"
              height="240"
              src={ videoSrc(details.strYoutube) }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="recomendation-container">
            <span>Recomendadas</span>
            <DrinksRecomendations recomendations={ recomendations } />
          </div>
        </>
      )}
      {!doneRecipe && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`/comidas/${id}/in-progress`) }
        >
          {inProgressRecipe ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>)}
    </div>
  );
}

export default FoodsDetails;
