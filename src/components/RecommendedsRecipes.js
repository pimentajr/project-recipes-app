import React, { useState, useContext } from 'react';
import NextIcon from '../images/next.png';
import PreviousIcon from '../images/previous.png';
import RecipesContext from '../context/RecipesContext';

function RecommendedsRecipes() {
  const { recommended: recipes } = useContext(RecipesContext);
  const [position, setPosition] = useState({ a: 0, b: 1 });

  const prevSlide = () => {
    if (position.a !== 0) {
      setPosition({ a: position.a -= 2, b: position.b -= 2 });
    }
  };
  const nextSlide = () => {
    if (position.b !== recipes.length - 1) {
      setPosition({ a: position.a += 2, b: position.b += 2 });
    }
  };

  return (
    <>
      <h2 className="text-center">Recommendations</h2>
      <div className="carousel">
        <button type="button" onClick={ prevSlide } className="button-carousel">
          <img
            src={ PreviousIcon }
            alt="Previous Icon"
            className="button-carousel-icon"
          />
        </button>
        {Array.isArray(recipes)
       && recipes.map((recipe, index) => (
         <div
           key={ index }
           data-testid={ `${index}-recomendation-card` }
           className={ index !== position.a && index !== position.b
             ? 'hide' : 'card-carousel rounded' }
         >
           <div className="card-recipe">
             <img
               className="carousel-image"
               src={ recipe.strMealThumb || recipe.strDrinkThumb }
               alt={ recipe.strMeal || recipe.strDrink }
             />
             <h4 className="text-center" data-testid={ `${index}-recomendation-title` }>
               { recipe.strMeal || recipe.strDrink }
             </h4>
           </div>
         </div>
       ))}
        <button type="button" onClick={ nextSlide } className="button-carousel">
          <img src={ NextIcon } alt="Next Icon" className="button-carousel-icon" />
        </button>
      </div>
    </>
  );
}

export default RecommendedsRecipes;
