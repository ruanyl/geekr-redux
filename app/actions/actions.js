import fetch from 'isomorphic-fetch';

export const GOTO_PAGE = 'GOTO_PAGE';
export const RECEIVE_PAGE = 'RECEIVE_PAGE';

function _gotoPage(pageNo) {
  return {
    type: GOTO_PAGE,
    pageNo
  };
}

function receivePage(json) {
  return {
    type: RECEIVE_PAGE,
    json
  };
}

export function gotoPage(pageNo) {
  return dispatch => {
    dispatch(_gotoPage(pageNo));
    return fetch(`./page${pageNo}.json`)
      .then(res => res.json())
      .then(json => dispatch(receivePage(json)));
  };
}

