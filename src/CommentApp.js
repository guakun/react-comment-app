import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class CommentApp extends Component {
  constructor () {
    super()
    this.state = {
      comments: []
    }
  }

  componentDidMount () {
    this._loadComments()
  }

  _loadComments () {
    let comments = localStorage.getItem('comments')
    if (comments && comments.length > 0) {
      comments = JSON.parse(comments)
      this.setState({ comments })
    }
  }

  _saveComments (comments) {
    localStorage.setItem('comments', JSON.stringify(comments))
  }

  onDeleteComment (index) {
    const nextComments = JSON.parse(JSON.stringify(this.state.comments))
    nextComments.splice(index, 1)
    this.setState({comments: nextComments})
    this._saveComments()
  }

  onSubmit (comment) {
    this.state.comments.push(comment)
    if (!comment) return
    if (!comment.username) return alert('请输入用户名！')
    if (!comment.content) return alert('请输入评论！')
    this.setState({
      comments: this.state.comments
    })
    this._saveComments(this.state.comments)
  }

  render () {
    return (
      <div className='wrapper'>
        <CommentInput onSubmit={this.onSubmit.bind(this)} />
        <CommentList comments={this.state.comments} onDeleteComment={this.onDeleteComment.bind(this)}/>
      </div>
    )
  }
}

export default CommentApp
