import React, { Component } from 'react';
import './App.css';
import { Link, Route } from 'react-router-dom';
import Home from './Components/Home';
import Privacy from './Components/Privacy';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/privacy">Privacy</Link>
          </nav>
        </div>

        <div>
          <Route exact path="/" component={Home} />
          <Route path="/privacy" component={Privacy} />
        </div>
      </div>
    );
  }
}

export default App;
