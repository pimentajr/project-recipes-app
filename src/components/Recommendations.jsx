import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { fetchAPI, getIds } from '../services';
import { CarouselItem } from '../styles';

const six = 6;
export default function Recommendations({ type }) {
  const [items, setItems] = useState();
  useEffect(() => {
    const asyncFunc = async () => {
      if (type === 'comida') setItems(await fetchAPI.food.searchName(''));
      if (type === 'bebida') setItems(await fetchAPI.drink.searchName(''));
    };
    asyncFunc();
  }, [type]);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (items) ? (
    <Carousel responsive={ responsive } removeArrowOnDeviceType={ ['tablet', 'mobile'] }>
      {
        items.slice(0, six).map((element, index) => {
          const { image, name, id, type: drinkOrFood } = getIds(type, element);
          return (
            <Link to={ `/${drinkOrFood}s/${id}` } key={ index }>
              <CarouselItem
                className="p-3 my-2 bg-light rounded border"
                data-testid={ `${index}-recomendation-card` }
              >
                <img src={ image } alt={ name } className="rounded border" />
                <p data-testid={ `${index}-recomendation-title` }>{ name }</p>
              </CarouselItem>
            </Link>
          );
        })
      }
    </Carousel>
  ) : <p>Loading ...</p>;
}

Recommendations.propTypes = {
  type: PropTypes.string.isRequired,
};
