import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import Modal from '../Modal/Modal';
import './Home.css';
import close from '../../icons/close.png';
import addFav from '../../icons/addFav.png';
import remFav from '../../icons/remFav.png';
import { connect } from 'react-redux';
import {
  getLocationWeather,
  addToFavorites,
  removeFromFavorites,
  handleClose
} from '../../redux/actions/weatherActions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputResults: [],
      selection: '',
      showModal: false
    };
  }

  componentDidMount() {
    if (this.props.name === null) {
      this.props.getLocationWeather({ name: 'Tel Aviv', key: '215854' });
    }
  }

  handleSearchChange = input => {
    const english = /^[A-Za-z ]+$/;
    if (input.trim().length === 0) {
      this.setState({ selection: '', inputResults: [] });
    } else if (input.length > 0 && !english.test(input)) {
      this.setState({ showModal: true, selection: '', inputResults: [] });
    } else {
      input = input.toUpperCase();
      fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${input}`
      )
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) {
            this.setState({ inputResults: data });
          } else {
            this.setState({ inputData: [] });
          }
        });
    }
  };

  handleSearchSelect = value => {
    this.setState({
      selection: `${value.LocalizedName}, ${value.Country.LocalizedName}`,
      inputResults: []
    });
    this.props.getLocationWeather({
      name: value.LocalizedName,
      key: value.Key
    });
  };

  renderSuggestions = () => {
    const { inputResults } = this.state;
    if (inputResults.length === 0) {
      return null;
    }
    return (
      <ul
        className="border border-grey col-sm-6 list-unstyled position-absolute bg-white"
        style={{ zIndex: 1000 }}
      >
        {inputResults.map(item => (
          <li
            key={item.Key}
            className="autoCompleteLi"
            onClick={() => this.handleSearchSelect(item)}
          >
            {item.LocalizedName}, {item.Country.LocalizedName}
          </li>
        ))}
      </ul>
    );
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    //Change between Add to Favorites/Remove from Favorites
    const favoriteButton = this.props.favorites.find(
      fav => fav.name === this.props.name
    ) ? (
      <div className="col-xs-12 col-md-6 mt-4 d-flex">
        <img
          src={addFav}
          alt="remove-fave"
          className="img fav"
          onClick={() =>
            this.props.removeFromFavorites({ name: this.props.name })
          }
        />
        <div className="mt-3">
          <h4 className="col">Remove from Favorites</h4>
        </div>
      </div>
    ) : (
      <div className="col-xs-12 col-md-6 mt-4 d-flex">
        <img
          src={remFav}
          alt="addFav"
          className="img fav"
          onClick={() => {
            this.props.addToFavorites({
              name: this.props.name,
              key: this.props.keyNum,
              currentWeather: this.props.currentWeather
            });
          }}
        />{' '}
        <div className="mt-3">
          <h4 className="col">Add to Favorites</h4>
        </div>
      </div>
    );

    //Five day forecast map
    const fiveDay =
      this.props.fiveDayForecast &&
      this.props.fiveDayForecast.map(day => {
        return (
          <div key={day.name} className="col-md-2 mt-4">
            <div className="card text-center">
              <h3 className="mt-4">{day.name}</h3>
              <p>{`${day.minTemp}° - ${day.maxTemp}° c`}</p>
            </div>
          </div>
        );
      });

    //Handle X click
    const locationSelected = this.props.isSelected ? (
      <Card.Body>
        <div className="row">
          <div className="col-xs-12 col-md-6 mt-4 d-flex">
            <img
              src={close}
              alt="close"
              className="close img"
              onClick={() => {
                this.setState({ selection: '' });
                this.props.handleClose();
              }}
            />
            <div className="ml-2">
              <h4>{this.props.name}</h4>
              <h5>{this.props.currentWeather.temperature}</h5>
            </div>
          </div>
          {favoriteButton}
        </div>
        <hr />

        <h3 className="text-center" style={{ marginTop: '75px' }}>
          {this.props.currentWeather.weatherText}
        </h3>

        <div className="row" style={{ marginTop: '75px' }}>
          <div className="col-sm-1"></div>
          {fiveDay}
        </div>
      </Card.Body>
    ) : (
      <h1 className="text-center">Select a location to view weather</h1>
    );
    return (
      <React.Fragment>
        <div className="mt-4 col-6 mx-auto">
          <input
            type="text"
            name="searchInput"
            className="form-control"
            placeholder="Search City"
            value={this.state.selection}
            autoComplete="off"
            onChange={e => {
              this.setState({ selection: e.target.value });
              this.handleSearchChange(e.target.value);
            }}
          />

          {this.renderSuggestions()}
        </div>
        <Modal
          show={this.state.showModal}
          close={this.closeModal}
          onHide={this.closeModal}
        />
        <div>
          <Card
            className="col-10 mx-auto mt-4 mb-4"
            style={{ minHeight: '75vh' }}
          >
            {locationSelected}
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  name: state.name,
  keyNum: state.key,
  favorites: state.favorites,
  currentWeather: state.currentWeather,
  fiveDayForecast: state.fiveDayForecast,
  isSelected: state.isSelected
});

export default connect(
  mapStateToProps,
  { getLocationWeather, addToFavorites, removeFromFavorites, handleClose }
)(Home);
