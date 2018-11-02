import { combineReducers } from 'redux';
import nav from './navigation';
import inicio from './inicio';
import placa from './placa';

const AppReducer = combineReducers({
  nav,inicio, placa
});

const rootReducer = (state, action) => {
  return AppReducer(state, action);
}

export default rootReducer;
