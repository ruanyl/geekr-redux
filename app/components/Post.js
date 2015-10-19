require('skeleton');
require('../static/css/style.css');

import React, { Component, PropTypes } from 'react';

export default class Post extends Component {
  render() {
    return (
      <li className='post-list'>
        <p className='post-title'><a className="post-link" href={this.props.url} target="_blank">{this.props.title}</a></p>
        { this.props.author ? <span className="post-author">{this.props.author}</span> : null }
        <span className="time">{this.props.time}</span>
        {this.props.tags.map(function(tag, i) {
          let style = {
            backgroundColor: tag.color
          };
          return <span key={i} className="tag" style={style}>{tag.name}</span>;
        })}
      </li>
    );
  }
}
