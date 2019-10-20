const initialState = {
  name: null,
  key: '',
  currentWeather: {},
  fiveDayForecast: [],
  favorites: [],
  isSelected: true
};

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOCATION_WEATHER':
      return {
        ...state,
        isSelected: true,
        name: action.payload.name,
        key: action.payload.key,
        currentWeather: {
          weatherText: action.payload.currentWeather.WeatherText,
          temperature: `${Math.floor(
            action.payload.currentWeather.Temperature.Metric.Value
          )}° c`
        },
        fiveDayForecast: action.payload.fiveDayForecast.map(day => {
          day.name = days[new Date(day.Date).getDay()];
          day.minTemp = Math.floor(
            ((day.Temperature.Minimum.Value - 32) * 5) / 9
          );
          day.maxTemp = Math.floor(
            ((day.Temperature.Maximum.Value - 32) * 5) / 9
          );
          const fixedDay = {
            name: day.name,
            minTemp: day.minTemp,
            maxTemp: day.maxTemp
          };
          return fixedDay;
        })
      };
    case 'ADD_FAVORITE':
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'REMOVE_FAVORITE':
      const index = state.favorites.findIndex(
        fav => fav.name === action.payload.name
      );
      const updatedFavorites = [...state.favorites];
      updatedFavorites.splice(index, 1);
      return { ...state, favorites: updatedFavorites };
    case 'HANDLE_CLOSE':
      return { isSelected: false, favorites: state.favorites };
    default:
      return state;
  }
};

export default rootReducer;
