import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
// import PropTypes from 'prop-types'
import { Provider } from './react-redux'

function createStore (reducer) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({}) // 初始化 state
  return { getState, dispatch, subscribe }
}

const themeReducer = (state, action) => {
  if (!state) return {
    themeColor: '#13c1f1'
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}

const store = createStore(themeReducer)

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
    // this.state.comments.push(comment)
    this.state.comments.unshift(comment)
    // const nextComments = this.state.comments.splice(0)
    // nextComments.unshift(comment)
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
      <Provider store={store}>
        <div className='wrapper'>
          <CommentInput onSubmit={this.onSubmit.bind(this)} />
          <CommentList comments={this.state.comments} onDeleteComment={this.onDeleteComment.bind(this)}/>
        </div>
      </Provider>
    )
  }
}

export default CommentApp
