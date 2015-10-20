require('skeleton');
require('../static/css/style.css');

import React, {Component} from 'react';

export default class Post extends Component {
  handleLikeClick(url) {
    this.props.handleLikeClick(url);
  }

  getLike() {
    let like;
    if(this.props.like) {
      like = <i className='fa fa-heart'></i>;
    } else {
      like = <i className='fa fa-heart-o'></i>;
    }
    return like;
  }

  render() {
    return (
      <li className='post-list'>
        <p className='post-title'>
          <a className='post-link' href={this.props.url} target='_blank'>{this.props.title}</a>
        </p>
        { this.props.author ? <span className='post-author'>{this.props.author}</span> : null }
        <span className='time'>{this.props.time}</span>
        {this.props.tags.map(function(tag, i) {
          const style = {
            backgroundColor: tag.color
          };
          return <span key={i} className='tag' style={style}>{tag.name}</span>;
        })}
        <span onClick={this.handleLikeClick.bind(this, this.props.url)} className='post-like'>
          {this.getLike()}
        </span>
      </li>
    );
  }
}
