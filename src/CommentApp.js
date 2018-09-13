import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class CommentApp extends Component {
  constructor () {
    super()
    this.state = {
      comments: [
        {username: 'gua', content: 'kun'}
      ]
    }
  }

  onSubmit (comment) {
    this.state.comments.push(comment)
    if (!comment) return
    if (!comment.username) return alert('请输入用户名！')
    if (!comment) return alert('请输入密码！')
    this.setState({
      comments: this.state.comments
    })
  }

  render () {
    return (
      <div className='wrapper'>
        <CommentInput onSubmit={this.onSubmit.bind(this)} />
        <CommentList comments={this.state.comments}/>
      </div>
    )
  }
}

export default CommentApp
