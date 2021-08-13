import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { UserProvider } from './Context/UserHook';
import { RequestProvider } from './Context/RequestHook';

import Login from './pages/Login';
import foodPage from './pages/FoodPage';
import drinkPage from './pages/DrinkPage';
import Explore from './pages/Explore';
import exploreFood from './pages/ExploreFood';
import exploreDrink from './pages/ExploreDrink';
import exploreFoodIngredients from './pages/ExploreFoodIngredients';
import exploreDrinkIngredients from './pages/ExploreDrinkIngredients';
import exploreByOrigin from './pages/ExploreByOrigin';
import userProfile from './pages/UserProfile';
import finishRecipe from './pages/FinishRecipe';
import favoriteRecipe from './pages/FavoriteRecipe';
import DetailsFood from './pages/DetailsFood';
import DetailsDrink from './pages/DetailsDrink';
import NotFound from './pages/NotFound';
import RecipeProgressFood from './pages/RecipeProgressFood';
import RecipeProgressDrink from './pages/RecipeProgressDrink';

function App() {
  return (
    <UserProvider>
      <RequestProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ foodPage } />
            <Route exact path="/bebidas" component={ drinkPage } />
            <Route
              exact
              path="/comidas/:id"
              render={ (props) => (<DetailsFood { ...props } />) }
            />
            <Route
              exact
              path="/bebidas/:id"
              render={ (props) => (<DetailsDrink { ...props } />) }
            />
            <Route
              exact
              path="/comidas/:id/in-progress"
              render={ (props) => (<RecipeProgressFood { ...props } />) }
            />
            <Route
              exact
              path="/bebidas/:id/in-progress"
              render={ (props) => (<RecipeProgressDrink { ...props } />) }
            />
            <Route exact path="/explorar" component={ Explore } />
            <Route exact path="/explorar/comidas" component={ exploreFood } />
            <Route exact path="/explorar/bebidas" component={ exploreDrink } />
            <Route
              exact
              path="/explorar/comidas/ingredientes"
              component={ exploreFoodIngredients }
            />
            <Route
              exact
              path="/explorar/bebidas/ingredientes"
              component={ exploreDrinkIngredients }
            />
            <Route exact path="/explorar/comidas/area" component={ exploreByOrigin } />
            <Route exact path="/perfil" component={ userProfile } />
            <Route exact path="/receitas-feitas" component={ finishRecipe } />
            <Route exact path="/receitas-favoritas" component={ favoriteRecipe } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </RequestProvider>
    </UserProvider>
  );
}

export default App;
