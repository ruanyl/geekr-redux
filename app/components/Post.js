import React, { Component, PropTypes } from 'react';

export default class Post extends Component {
  render() {
    return (
      <li>
        <a className="post-link" href={this.props.url} target="_blank">{this.props.title}</a>
        <span className="author">{this.props.author}</span>
        <span className="time">{this.props.time}</span>
        <span className="tag">{this.props.tag}</span>
      </li>
    );
  }
}
