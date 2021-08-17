import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Button, Fade } from 'react-bootstrap';
import shareIcon from '../../../images/shareIcon.svg';

export default function CopyButton({ testId, id, selector }) {
  const [isMessageShowing, setIsMessageShowing] = useState(false);

  const handleCopyBtn = () => {
    setIsMessageShowing(true);
    if (selector === 'bebida') {
      copy(`http://localhost:3000/bebidas/${id}`);
    } else {
      copy(`http://localhost:3000/comidas/${id}`);
    }
  };

  return (
    <div className="d-flex align-items-center">
      <Fade in={ isMessageShowing }>
        <div className="d-flex">
          <span className="text-muted">Link copiado!</span>
        </div>
      </Fade>
      <Button
        variant="primary"
        className="rounded-circle p-2 ml-2"
        type="button"
        src={ shareIcon }
        onClick={ handleCopyBtn }
        data-testid={ `${testId}` }
      >
        <img alt="Botão de copiar link" src={ shareIcon } />
      </Button>
    </div>
  );
}

CopyButton.propTypes = {
  testId: PropTypes.string,
  id: PropTypes.string,
  selector: PropTypes.string,
}.isRequired;
