import React, { Component, PropTypes } from 'react';

export default class Post extends Component {
  render() {
    return (
      <li>
        <a href="{this.props.url}" target="_blank">{this.props.title}</a>
        <span>{this.props.time}</span>
        <span>{this.props.tag}</span>
      </li>
    );
  }
}
