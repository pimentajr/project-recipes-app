import PropTypes from 'prop-types';
import React from 'react';
import copy from 'clipboard-copy';
import { useAlert } from 'react-alert';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ id, type, dataTestid }) {
  const alert = useAlert();
  function handleClick() {
    copy(`http://localhost:3000/${type}s/${id}`);
    alert.success('Link copiado!');
  }
  return (
    <div className="d-flex">
      <button className="neutral-button" type="button" onClick={ () => handleClick() }>
        <img src={ shareIcon } alt="Share Icon" data-testid={ dataTestid } />
      </button>
    </div>
  );
}

ShareButton.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
};
