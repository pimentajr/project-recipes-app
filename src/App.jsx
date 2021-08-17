import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import { RecipesContextProvider } from './contexts/RecipesContext';

import Login from './pages/Login';
import MealsRecipes from './pages/MealsRecipes';
import MealDetail from './pages/MealDetail';
import MealsInProgress from './pages/MealsInProgress';
import CocktailsRecipes from './pages/CocktailsRecipes';
import CocktailDetail from './pages/CocktailDetail';
import CocktailsInProgress from './pages/CocktailsInProgress';
import Explore from './pages/Explore';
import ExploreMeals from './pages/ExploreMeals';
import ExploreMealsByIngredient from './pages/ExploreMealsByIngredient';
import ExploreMealsByArea from './pages/ExploreMealsByArea';
import ExploreCocktails from './pages/ExploreCocktails';
import ExploreCocktailsByIngredient from './pages/ExploreCocktailsByIngredient';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div className="RecipesApp">
      <RecipesContextProvider>
        <BrowserRouter>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ MealsRecipes } />
          <Route exact path="/comidas/:id" component={ MealDetail } />
          <Route path="/comidas/:id/in-progress" component={ MealsInProgress } />
          <Route exact path="/bebidas" component={ CocktailsRecipes } />
          <Route exact path="/bebidas/:id" component={ CocktailDetail } />
          <Route path="/bebidas/:id/in-progress" component={ CocktailsInProgress } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/explorar/comidas" component={ ExploreMeals } />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExploreMealsByIngredient }
          />
          <Route exact path="/explorar/comidas/area" component={ ExploreMealsByArea } />
          <Route exact path="/explorar/bebidas" component={ ExploreCocktails } />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ ExploreCocktailsByIngredient }
          />
          <Route path="/perfil" component={ Profile } />
          <Route path="/receitas-feitas" component={ DoneRecipes } />
          <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
        </BrowserRouter>
      </RecipesContextProvider>
    </div>
  );
}

export default App;
