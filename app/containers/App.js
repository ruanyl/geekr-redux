import fetch from 'isomorphic-fetch';

import React, { Component, PropTypes } from 'react';
import Post from '../components/Post';
import PostList from '../components/PostList';
import Pagination from '../components/Pagination';
import Indicator from '../components/Indicator';
import { connect } from 'react-redux';
import { gotoPage, nextPage, prevPage, requestPage } from '../actions/actions';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(requestPage(1));
  }

  render() {
    const { dispatch, data } = this.props;
    return (
      <div className="main">
        <Indicator pending={data.pending} />
        <PostList posts={data['page' + data.current]} />
        <Pagination
          onPage={this.handleOnPage.bind(this)}
          onPrevPage={this.handleOnPrevPage.bind(this)}
          onNextPage={this.handleOnNextPage.bind(this)}
          total={data.total}
          current={data.next}
          pendding={data.pending} />
      </div>
    );
  }

  handleOnPage(i) {
    this.props.dispatch(gotoPage(i));
    this.props.dispatch(requestPage(i));
  }

  handleOnPrevPage() {
    const { dispatch, data } = this.props;
    let pageNo = data.current > 1 ? data.current - 1 : data.current;
    dispatch(prevPage());
    dispatch(requestPage(pageNo));
  }

  handleOnNextPage() {
    const { dispatch, data } = this.props;
    let pageNo = data.current < data.total ? data.current + 1 : data.current;
    dispatch(nextPage());
    dispatch(requestPage(pageNo));
  }
}

function select(state) {
  return {
    data: state.pages
  };
}

export default connect(select)(App);
