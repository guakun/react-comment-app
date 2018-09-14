import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CommentInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onBlur: PropTypes.func,
    username: PropTypes.any
  }

  static defaultProps = {
    username: ''
  }

  constructor (props) {
    super(props)
    this.state = {
      username: props.username,
      content: '',
    }
  }

  componentDidMount () {
    this.textarea.focus()
  }

  onUpdateUsername (event) {
    this.props.onBlur && this.props.onBlur(event.target.value)
  }

  onSubmit () {
    const {username, content} = this.state
    this.props.onSubmit && this.props.onSubmit({username, content, createdTime: new Date() })
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
          <span className="comment-field-name" style={{ color: this.props.themeColor }}>用户名:</span>
          <div className="comment-field-input">
            <input
              value={this.state.username}
              onChange={(e) => {this.onUpdateState('username', e)}}
              onBlur={ (e) => {this.onUpdateUsername(e)}}
              />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论:</span>
          <div className="comment-field-input"> <textarea ref={(textarea) => {this.textarea = textarea}} value={this.state.content} onChange={(e) => {this.onUpdateState('content', e)}}/> </div>
        </div>
        <div className="comment-field-button">
          <button onClick={this.onSubmit.bind(this)}>发布</button>
        </div>
      </div>
    )
  }
}
