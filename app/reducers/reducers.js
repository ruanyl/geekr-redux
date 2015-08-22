import { GOTO_PAGE, NEXT_PAGE, PREV_PAGE, RECEIVE_PAGE } from '../actions/actions';

export function pages(state={total: 1, current: 1, page1: []}, action) {
  switch(action.type) {
    case GOTO_PAGE:
      return Object.assign({}, state, {current: action.pageNo});
    case NEXT_PAGE:
      let nextPage = state.total > state.current ? state.current + 1 : state.total;
      return Object.assign({}, state, {current: nextPage});
    case PREV_PAGE:
      let prevPage = state.current > 1 ? state.current - 1 : state.current;
      return Object.assign({}, state, {current: prevPage});
    case RECEIVE_PAGE:
      let newData = {};
      newData['page' + action.pageNo] = action.json['page' + action.pageNo];
      newData.total = action.json.total;
      newData.current = action.json.current;
      return Object.assign({}, state, newData);
    default:
      return state;
  }
}
