import { GOTO_PAGE, NEXT_PAGE, PREV_PAGE, RECEIVE_PAGE } from '../actions/actions';

export function pages(state={total: 7, current: 1}, action) {
  switch(action.type) {
    case GOTO_PAGE:
      return Object.assign({}, state, {current: action.pageNo});
    case NEXT_PAGE:
      let nextPage = state.total > state.current ? state.current + 1 : state.total;
      return Object.assign({}, state, {current: nextPage});
    case PREV_PAGE:
      let prevPage = state.current > 1 ? state.current - 1 : state.current;
      return Object.assign({}, state, {current: prevPage});
    default:
      return state;
  }
}

export function pageData(state={page1: {post: null}}, action) {
  switch(action.type) {
    case RECEIVE_PAGE:
      let newData = {};
      newData['page' + action.pageNo] = action.json;
      return Object.assign({}, state, newData);
    default:
      return state;
  }
}
