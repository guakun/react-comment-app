import React, { Component } from 'react'
import Comment from './Comment'

class CommentList extends Component {
  static defaultProps = {
    comments: []
  }

  onDeleteComment (index) {
    this.props.onDeleteComment && this.props.onDeleteComment(index)
  }

  render () {
    return (
      <div> {this.props.comments.map((item, index) => <Comment comment={item} key={index} index={index} onDeleteComment={this.onDeleteComment.bind(this)}/> )} </div>
    )
  }
}

export default CommentList