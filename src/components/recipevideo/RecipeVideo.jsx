import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeVideo({ strMeal, strYoutube }) {
  return (
    <div>
      {
        strYoutube !== undefined
         && <iframe
           title={ strMeal }
           src={ strYoutube.replace('watch?v=', 'embed/') }
           width="355"
           height="320"
           frameBorder="0"
           allow="accelerometer; autoplay; clipboard-write;
                      encrypted-media; gyroscope; picture-in-picture"
           allowFullScreen
         />
      }
    </div>
  );
}

RecipeVideo.propTypes = {
  strYoutube: PropTypes.string,
  strMeal: PropTypes.string,
}.isRequired;
