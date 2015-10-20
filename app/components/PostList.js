require('../static/css/style.css');

import React, {Component} from 'react';
import Post from './Post';

export default class PostList extends Component {
  render() {
    return (
      <ul className='posts'>
        {this.props.posts ? this.props.posts.map(
          (post, index) => <Post handleLikeClick={this.props.handleLikeClick} key={index} {...post} />
          ) : ''}
      </ul>
    );
  }
}
