export const getLocationWeather = location => dispatch => {
  Promise.all([
    fetch(
      `https://dataservice.accuweather.com/currentconditions/v1/${location.key}?apikey=${process.env.REACT_APP_API_KEY}`
    ).then(value => value.json()),
    fetch(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${location.key}?apikey=${process.env.REACT_APP_API_KEY}`
    ).then(value => value.json())
  ])
    .then(value => {
      dispatch({
        type: 'LOCATION_WEATHER',
        payload: {
          name: location.name,
          key: location.key,
          currentWeather: value[0][0],
          fiveDayForecast: value[1].DailyForecasts
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const addToFavorites = location => dispatch => {
  dispatch({ type: 'ADD_FAVORITE', payload: location });
};

export const removeFromFavorites = location => dispatch => {
  dispatch({ type: 'REMOVE_FAVORITE', payload: location });
};

export const handleClose = () => dispatch => {
  dispatch({ type: 'HANDLE_CLOSE' });
};
