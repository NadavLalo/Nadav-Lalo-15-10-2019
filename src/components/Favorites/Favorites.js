import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Favorites.css';
import { getLocationWeather } from '../../redux/actions/weatherActions';
class Favorites extends Component {
  handleFavoriteClick = location => {
    console.log(location.name);
    if (location.name !== this.props.uploadedLocation) {
      this.props.getLocationWeather(location, '2');
    }
    this.props.history.push('/');
  };
  render() {
    const display =
      this.props.favorites.length > 0 ? (
        this.props.favorites.map((fav, i) => {
          return (
            <div
              className="col-sm-3 mt-4 pointer"
              key={i}
              id={i}
              onClick={() => {
                this.handleFavoriteClick(fav);
              }}
            >
              <div className="card text-center mx-4">
                <div className="card-body">
                  <h5 className="card-title">{fav.name}</h5>
                  <h6>{fav.currentWeather.temperature}</h6>
                  <p className="card-text">{fav.currentWeather.weatherText}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1 className="mx-auto text-center card col-sm-8">
          No locations have been added to favorites
        </h1>
      );
    return (
      <div className="">
        <div className="row mt-4">{display}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uploadedLocation: state.name,
  favorites: state.favorites
});
export default connect(
  mapStateToProps,
  { getLocationWeather }
)(Favorites);
