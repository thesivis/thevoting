import React, { Component } from 'react';
import './App.css';
import config from 'react-global-configuration';
import Header from './componentes/Header.js';

config.set({ 
  url: 'http://localhost:8000/'
});

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Home</h1>

      </div>
    );
  }
}

export default App;
