import React, { Component, PropTypes } from 'react';
import Post from './Post';

export default class PostList extends Component {
  render() {
    return (
      <ul>
        {this.props.posts ? this.props.posts.map((post, index) => <Post key={index} {...post} />) : ''}
      </ul>
    );
  }
}
