import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentInput from '../components/CommentInput'
import { addComment } from '../reducers/comments'

class CommentInputContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onSubmit: PropTypes.func
  }

  constructor () {
    super()
    this.state = { username: '' }
  }

  componentWillMount () {
    this._loadUsername()
  }

  _loadUsername () {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }

  _saveUsername(username) {
    localStorage.setItem('username', username)
  }

  _saveComments (comments) {
    localStorage.setItem('comments', JSON.stringify(comments))
  }

  onUpdateUsername (event) {
    this._saveUsername(event.target.value)
  }

  onSubmit (comment) {
    if (!comment) return
    if (!comment.username) return alert('请输入用户名！')
    if (!comment.content) return alert('请输入评论！')
    const { comments } = this.props
    const newComments = [...comments, comment]
    this._saveComments(newComments)
    this.props.onSubmit && this.props.onSubmit(comment)
  }

  onUpdateState (key, event) {
    this.setState({
      [key]: event.target.value
    })
  }

  render () {
    return (
      <CommentInput
        username={this.state.username}
        onBlur={this.onUpdateUsername.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
        />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (comment) => {
      dispatch(addComment(comment))
    }
  }
}

export default CommentInputContainer = connect(mapStateToProps, mapDispatchToProps)(CommentInputContainer)