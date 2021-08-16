import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Explorer from './pages/Explorer';

import FoodsRecipiesInProcess from './pages/FoodsRecipiesInProcess';
import Foods from './pages/Foods';
import ExplorerFoods from './pages/ExplorerFoods';
import FoodsIngredients from './pages/FoodsIngredients';
import FoodsDetails from './pages/FoodsDetails';

import DrinksRecipiesInProcess from './pages/DrinksRecipiesInProcess';
import Drinks from './pages/Drinks';
import ExplorerDrinks from './pages/ExplorerDrinks';
import DrinksIngredients from './pages/DrinksIgredients';
import DrinksDetails from './pages/DrinksDetails';

import Favorites from './pages/Favorites';
import RecipesByLocation from './pages/RecipesByLocation';
import DoneRecipes from './pages/DoneRecipes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/explorar" component={ Explorer } />
        <Route exact path="/explorar/comidas" component={ ExplorerFoods } />
        <Route exact path="/explorar/bebidas" component={ ExplorerDrinks } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ FoodsIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ DrinksIngredients }
        />
        <Route exact path="/receitas-favoritas" component={ Favorites } />
        <Route exact path="/explorar/comidas/area" component={ RecipesByLocation } />
        <Route exact path="/receitas-feitas" component={ DoneRecipes } />
        <Route exact path="/comidas/:id" component={ FoodsDetails } />
        <Route exact path="/bebidas/:id" component={ DrinksDetails } />
        <Route
          exact
          path="/comidas/:id/in-progress"
          component={ FoodsRecipiesInProcess }
        />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          component={ DrinksRecipiesInProcess }
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
