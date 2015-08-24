export const GOTO_PAGE = 'GOTO_PAGE';
export const NEXT_PAGE = 'NEXT_PAGE';
export const PREV_PAGE = 'PREV_PAGE';
export const REQUEST_PAGE = 'REQUEST_PAGE';
export const RECEIVE_PAGE = 'RECEIVE_PAGE';

export function gotoPage(pageNo) {
  return {
    type: GOTO_PAGE,
    pageNo
  };
}

export function nextPage() {
  return {
    type: NEXT_PAGE
  };
}

export function prevPage() {
  return {
    type: PREV_PAGE
  };
}

export function requestPage(pageNo) {
  return dispatch => {
    return fetch(`/page${pageNo}.json`)
      .then(res => res.json())
      .then(json => dispatch(receivePage(json, pageNo)));
  };
}

function receivePage(json, pageNo) {
  return {
    type: RECEIVE_PAGE,
    json,
    pageNo
  };
}
