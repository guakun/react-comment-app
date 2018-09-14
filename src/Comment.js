import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Comment extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  constructor () {
    super()
    this.state = {
      timeString: '',
      themeColor: ''
    }
  }

  componentWillMount () {
    this._updateTimeString()
    this._timer = setInterval(this._updateTimeString.bind(this), 5000)
    this._updateThemeColor()
    const { store } = this.context
    store.subscribe(() => this._updateThemeColor())
  }

  commentWillUnmount () {
    clearInterval(this._timer)
  }

  _updateThemeColor () {
    const { store } = this.context
    const state = store.getState()
    this.setState({ themeColor: state.themeColor })
  }

  _getProcessContent (content) {
    return content
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  }

  _updateTimeString () {
    const comment = this.props.comment
    const duration = (Date.now() - new Date(comment.createdTime)) / 1000 // books has wrong
    this.setState({
      timeString: duration > 60 ? `
        ${Math.round(duration / 60)} 分钟前` : `
        ${Math.round(Math.max(duration, 1))} 秒前`
    })
  }

  onClickDelete () {
    this.props.onDeleteComment && this.props.onDeleteComment(this.props.index)
  }

  render () {
    return (
      <div className="comment">
        <div className="comment-username"> <span>{this.props.comment.username} </span>: </div>
        <p  style={{ color: this.state.themeColor }} dangerouslySetInnerHTML={{__html: this._getProcessContent(this.props.comment.content)}}></p>
        <span className="comment-createdtime">{this.state.timeString}</span>
        <span className="comment-delete" onClick={this.onClickDelete.bind(this)}>删除</span>
      </div>
    )
  }
}

export default Comment