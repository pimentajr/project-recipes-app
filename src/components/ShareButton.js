import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/black/shareIcon.svg';

function ShareButton({ link, index }) {
  const [copy, setCopy] = useState(false);

  function shareLink() {
    setCopy(true);
    return navigator.clipboard.writeText(link);
  }

  return (
    <button
      type="button"
      data-testid="share-btn"
      onClick={ () => shareLink() }
    >
      {copy ? (
        <span>Link copiado!</span>
      ) : (<img
        src={ shareIcon }
        alt="Compartilhar"
        data-testid={ `${index}-horizontal-share-btn` }
        className="share-btn"
      />)}
    </button>
  );
}

ShareButton.propTypes = {
  link: PropTypes.string.isRequired,
  index: PropTypes.number,
};

ShareButton.defaultProps = {
  index: 0,
};

export default ShareButton;
