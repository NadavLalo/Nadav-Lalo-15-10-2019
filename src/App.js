import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Favorites from './components/Favorites/Favorites';
const App = () => {
  return (
    <Router basename="weather-app/">
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/favorites" component={Favorites} />
    </Router>
  );
};
export default App;
