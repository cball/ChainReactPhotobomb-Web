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
          <a href="http://play.google.com/store/chainreactphotobomb?pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
            <img alt="Get it on Google Play" src={playStoreBadge} />
          </a>
          <a href="http://google.com">
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
            <img src={ebLogo} />
          </a>
        </div>
      </div>
    );
  }
}

export default App;
