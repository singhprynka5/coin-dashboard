import { combineReducers } from 'redux';

import coinDetails from './coinDetails';
import favourites from './favourites';
import tradeVolume from './tradeVolume';

export default combineReducers({
  coinDetails,
  favourites,
  tradeVolume
});
