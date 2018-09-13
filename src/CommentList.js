import React, { Component } from 'react'
import Comment from './Comment'

class CommentList extends Component {
  static defaultProps = {
    comments: []
  }

  render () {
    return (
      <div> {this.props.comments.map((item, index) => <Comment comment={item} key={index}/> )} </div>
    )
  }
}

export default CommentList