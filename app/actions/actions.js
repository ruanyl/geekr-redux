import fetch from 'isomorphic-fetch';
import localforage from 'localforage';

export const GOTO_PAGE = 'GOTO_PAGE';
export const RECEIVE_PAGE = 'RECEIVE_PAGE';
export const TOGGLE_LIKE = 'TOGGLE_LIKE';
export const LIKE = 'LIKE';

function _gotoPage(pageNo) {
  return {
    type: GOTO_PAGE,
    pageNo
  };
}

function page(json) {
  return {
    type: RECEIVE_PAGE,
    json
  };
}

function like(url) {
  return {
    type: LIKE,
    url
  };
}

function receivePage(json) {
  return dispatch => {
    dispatch(page(json));
    json['page' + json.current].map(function(item) {
      localforage.getItem(item.url, function(err, val) {
        if(err) {
          throw err;
        }
        if(val) {
          dispatch(like(item.url));
        }
      });
    });
  };
}

export function toggleLike(url) {
  return {
    type: TOGGLE_LIKE,
    url
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

