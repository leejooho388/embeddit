// import { ACTION } from '../actions';

const ACTION_NAME = 'ACTION_NAME';

export default function(state = {}, action) {
  switch(action.type) {
    case ACTION_NAME:
      return [...state, action.payload.data];
    default:
      return state;
  }
}