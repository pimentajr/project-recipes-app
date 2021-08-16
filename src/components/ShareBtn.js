import React from 'react';
import ShareBtnIcon from '../images/shareIcon.svg';

function ShareBtn() {
  function btnClickHandler() {
    const link = window.location.href;
    const newLink = link.split('/in-progress')[0];
    navigator.clipboard.writeText(newLink);
    const x = 'Link copiado!';
    document.getElementById('alert').innerHTML = x;
    return navigator.clipboard.writeText(newLink);
  }

  return (
    <div>
      <button
        type="button"
        onClick={ btnClickHandler }
      >
        <img
          data-testid="share-btn"
          src={ ShareBtnIcon }
          alt="icone Share"
        />
      </button>
      <p id="alert" />
    </div>
  );
}
export default ShareBtn;
