import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const RequestContext = createContext();

export function RequestProvider({ children }) {
  const [byCategory, setByCategory] = useState(false);
  const [byFilter, setByFilter] = useState(false);
  const [ingredient, setIngredient] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [initialItens, setInitialItens] = useState([]);

  const contextValues = {
    byCategory,
    setByCategory,
    byFilter,
    setByFilter,
    ingredient,
    setIngredient,
    filtered,
    setFiltered,
    initialItens,
    setInitialItens,
  };

  return (
    <RequestContext.Provider value={ contextValues }>
      { children }
    </RequestContext.Provider>
  );
}

RequestProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const RequestHook = () => useContext(RequestContext);
