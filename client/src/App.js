import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Controller from './Controller';

class App extends Component {
  render() {
    return (
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/stats/:id" component={Controller} />
    </Switch>
    );
  }
}

export default App;
