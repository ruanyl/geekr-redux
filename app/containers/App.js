import React, {Component} from 'react';
import PostList from '../components/PostList';
import Pagination from '../components/Pagination';
import Indicator from '../components/Indicator';
import {connect} from 'react-redux';
import {gotoPage, toggleLike} from '../actions/actions';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(gotoPage(1));
  }

  handleOnPrevPage() {
    const {dispatch, data} = this.props;
    const pageNo = data.current > 1 ? data.current - 1 : data.current;
    dispatch(gotoPage(pageNo));
  }

  handleOnNextPage() {
    const {dispatch, data} = this.props;
    const pageNo = data.current < data.total ? data.current + 1 : data.current;
    dispatch(gotoPage(pageNo));
  }

  handleOnPage(i) {
    this.props.dispatch(gotoPage(i));
  }

  handleLikeClick(url) {
    this.props.dispatch(toggleLike(url));
  }

  render() {
    const {data} = this.props;
    return (
      <div className='main'>
        <Indicator pending={data.pending} />
        <PostList handleLikeClick={this.handleLikeClick.bind(this)} posts={data['page' + data.current]} />
        <Pagination
          onPage={this.handleOnPage.bind(this)}
          onPrevPage={this.handleOnPrevPage.bind(this)}
          onNextPage={this.handleOnNextPage.bind(this)}
          total={data.total}
          current={data.current}
          pendding={data.pending} />
      </div>
    );
  }

}

function select(state) {
  return {
    data: state.pages
  };
}

export default connect(select)(App);
