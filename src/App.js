import React, { Component } from 'react';
import './App.css';
import { Link, Route } from 'react-router-dom';
import Home from './Components/Home';
import Privacy from './Components/Privacy';
import logo from './Images/logo.svg';
import appStoreBadge from './Images/app-store.svg';
import playStoreBadge from './Images/play-store.png';
import ebLogo from './Images/eb-logo.png';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h2>Photobomb!</h2>
        </div>
        <div className="badges">
          <a href="https://play.google.com/store/apps/details?id=com.echobind.chainreactphotobomb">
            <img alt="Get it on Google Play" src={playStoreBadge} />
          </a>
          <a href="https://itunes.apple.com/us/app/chain-react-photobomb/id1253527606?ls=1&mt=8">
            <img alt="Get it on the App Store" src={appStoreBadge} />
          </a>
        </div>

        <div>
          <Route exact path="/" component={Home} />
          <Route path="/privacy" component={Privacy} />
        </div>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/privacy">Privacy</Link>
        </nav>

        <div className="eb-logo">
          <div>Sponsored By:</div>
          <a href="https://echobind.com">
            <img src={ebLogo} alt="Echobind logo" />
          </a>
        </div>
      </div>
    );
  }
}

export default App;
