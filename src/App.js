import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Explorar from './pages/Explorar';
import Bebidas from './pages/Bebidas';
import Comidas from './pages/Comidas';
import Home from './pages/Home';
import DetalhesComidas from './pages/DetalhesComidas';
import DetalhesBebidas from './pages/DetalhesBebidas';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarIngredientesComidas from './pages/ExplorarIngredientesComidas';
import ExplorarIngredientesBebidas from './pages/ExplorarIngredientesBebidas';
import ExplorarComidasPorArea from './pages/ExplorarComidasPorArea';
import Perfil from './pages/Perfil';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ProcessoComidas from './pages/ProcessoComidas';
import ProcessoBebidas from './pages/ProcessoBebidas';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route
          exact
          path="/comidas/:id"
          render={ (props) => <DetalhesComidas { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:id"
          render={ (props) => <DetalhesBebidas { ...props } /> }
        />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExplorarIngredientesComidas }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarIngredientesBebidas }
        />
        <Route
          exact
          path="/comidas/:id/in-progress"
          render={ (props) => <ProcessoComidas { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          render={ (props) => <ProcessoBebidas { ...props } /> }
        />
        <Route exact path="/explorar/comidas/area" component={ ExplorarComidasPorArea } />
        <Route exact path="/explorar/bebidas/area" component={ NotFound } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
