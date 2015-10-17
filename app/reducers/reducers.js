import {GOTO_PAGE, RECEIVE_PAGE} from '../actions/actions';

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
    default:
      return state;
  }
}
