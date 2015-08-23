import fetch from 'isomorphic-fetch';

import React, { Component, PropTypes } from 'react';
import Post from '../components/Post';
import PostList from '../components/PostList';
import Pagination from '../components/Pagination';
import { connect } from 'react-redux';
import { gotoPage, nextPage, prevPage, requestPage } from '../actions/actions';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(requestPage(1));
  }

  render() {
    const { dispatch, data } = this.props;
    console.log(data);
    return (
      <div className="main">
        <PostList posts={data['page' + data.current]} />
        <Pagination
          onPage={this.handleOnPage.bind(this)}
          onPrevPage={this.handleOnPrevPage.bind(this)}
          onNextPage={() => dispatch(nextPage())}
          total={data.total}
          current={data.current} />
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
}

function select(state) {
  return {
    data: state.pages
  };
}

export default connect(select)(App);
