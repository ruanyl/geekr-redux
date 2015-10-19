require('../static/css/style.css');

import React, { Component, PropTypes } from 'react';

export default class Pagination extends Component {
  render() {
    return (
      <div className='pagination'>
        <a href="#" onClick={this.props.onPrevPage}>prev</a>
        {this.pageNumbers()}
        <a href="#" onClick={this.props.onNextPage}>next</a>
      </div>
    );
  }

  pageNumbers() {
    let result = [];
    for(let i = 1; i <= this.props.total; i++) {
      result.push(<a
        className={i === this.props.current ? 'current' : ''}
        key={i}
        href="#"
        onClick={e => this.handlePage(e)}
      >{i}</a>);
    }

    return result;
  }

  handlePage(e) {
    let pageNo = Number.parseInt(e.target.innerHTML);
    if(pageNo !== this.props.current) {
      this.props.onPage(pageNo);
    }
  }
}
