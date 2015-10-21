import localforage from 'localforage';
import {GOTO_PAGE, RECEIVE_PAGE, TOGGLE_LIKE, LIKE} from '../actions/actions';

const initialState = {
  total: 1,
  current: 1,
  pending: false,
  page1: []
};

export function pages(state = initialState, action) {
  switch(action.type) {
    case GOTO_PAGE:
      return Object.assign({}, state, {pending: true});
    case RECEIVE_PAGE:
      const newData = {};
      newData['page' + action.json.current] = action.json['page' + action.json.current];
      newData.total = action.json.total;
      newData.current = action.json.current;
      newData.pending = false;
      return Object.assign({}, state, newData);
    case TOGGLE_LIKE:
      const toggleLikeData = {};
      toggleLikeData['page' + state.current] = state['page' + state.current].map(function(item) {
        if(item.url === action.url) {
          item.like = item.like ? !item.like : 1;
          if(item.like) {
            localforage.setItem(item.url, 1);
          } else {
            localforage.removeItem(item.url);
          }
        }
        return item;
      });
      return Object.assign({}, state, toggleLikeData);
    case LIKE:
      const likeData = {};
      likeData['page' + state.current] = state['page' + state.current].map(function(item) {
        if(item.url === action.url) {
          item.like = 1;
        }
        return item;
      });
      return Object.assign({}, state, likeData);
    default:
      return state;
  }
}
