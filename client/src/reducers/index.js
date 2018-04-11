import { combineReducers } from 'redux';
import deleteLaterReducer from './reducerTemplate';

const rootReducer = combineReducers({
  deleteLaterReducer: deleteLaterReducer
});

export default rootReducer;
