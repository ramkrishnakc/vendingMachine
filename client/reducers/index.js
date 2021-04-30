import {combineReducers} from 'redux';
import homeReducer from '../containers/home/home.module';

const rootReducer = combineReducers({
  home: homeReducer,
});

export default rootReducer;
