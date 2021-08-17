import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Col, Image } from 'react-bootstrap';
import {
  retrieveDoneRecipes,
} from '../../services/handleLocalStorage';
import CopyButton from '../Details/CopyButton';

export default function DoneRecipesCard({ filter }) {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const getDoneRecipes = retrieveDoneRecipes();
    setDoneRecipes(getDoneRecipes);
  }, []);

  const history = useHistory();

  const handleRedirect = (type, id) => {
    history.push(`/${type}s/${id}`);
  };

  return (
    doneRecipes
      .filter(({ type }) => type !== filter)
      .map((el, index) => {
        const {
          id,
          type,
          area,
          category,
          alcoholicOrNot,
          name,
          image,
          doneDate,
          tags,
        } = el;
        let formatedCategory = alcoholicOrNot;
        if (type === 'comida') {
          formatedCategory = `${area} - ${category}`;
        }
        return (
          <div key={ id } className="d-flex mx-0 mb-3 bg-light rounded shadow-lg">
            <Image
              style={ { maxWidth: '160px' } }
              onClick={ () => handleRedirect(type, id) }
              className="ml-0 rounded-left"
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              fluid
            />
            <div className="d-flex flex-column">
              <Col onClick={ () => handleRedirect(type, id) }>
                <span data-testid={ `${index}-horizontal-name` }>{name}</span>
              </Col>
              <Col>
                <span data-testid={ `${index}-horizontal-top-text` }>
                  {formatedCategory}
                </span>
              </Col>
              <Col>
                <span data-testid={ `${index}-horizontal-done-date` }>{doneDate}</span>
              </Col>
              <Col>
                {tags.map((tag, i) => (
                  <span
                    key={ i }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    className="mr-1"
                  >
                    {tag}
                  </span>
                ))}
              </Col>
              <Col className="pb-2 justify-items-end">
                <CopyButton
                  testId={ `${index}-horizontal-share-btn` }
                  id={ id }
                  selector={ type }
                />
              </Col>
            </div>
          </div>
        );
      }));
}

DoneRecipesCard.propTypes = {
  filter: PropTypes.string.isRequired,
};
