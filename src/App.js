import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import store from './store';
import './App.css';
import Routes from './Routes';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 1250,
  offset: '30px',
  transition: transitions.SCALE,
};

function App() {
  return (
    <AlertProvider template={ AlertTemplate } { ...options }>
      <Provider store={ store }>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </AlertProvider>
  );
}

export default App;
