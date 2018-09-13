import React, { Component } from 'react'

class CommentInput extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      content: ''
    }
  }

  onSubmit () {
    const {username, content} = this.state
    this.props.onSubmit && this.props.onSubmit({username, content})
    this.setState({ content: '' })
  }

  onUpdateState (key, event) {
    this.setState({
      [key]: event.target.value
    })
  }

  render () {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">用户名:</span>
          <div className="comment-field-input"> <input value={this.state.username} onChange={(e) => {this.onUpdateState('username', e)}}/> </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论:</span>
          <div className="comment-field-input"> <textarea value={this.state.content} onChange={(e) => {this.onUpdateState('content', e)}}/> </div>
        </div>
        <div className="comment-field-button">
          <button onClick={this.onSubmit.bind(this)}>发布</button>
        </div>
      </div>
    )
  }
}

export default CommentInput