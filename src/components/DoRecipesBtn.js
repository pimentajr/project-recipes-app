import React from 'react';

function DoRecipesBtn() {
  function btnClickHandler() {
    // const targetString = JSON.parse(localStorage.getItem('inProgressRecipes') || '[]');
    // targetString.push(target);
    // localStorage.setItem('inProgressRecipes', JSON.stringify(target));
  }

  return (
    <div>
      <button
        type="button"
        onClick={ btnClickHandler }
      >
        Fazer
      </button>
    </div>
  );
}

export default DoRecipesBtn;
