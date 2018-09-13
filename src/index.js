import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import CommentApp from './CommentApp'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<CommentApp />, document.getElementById('root'))
registerServiceWorker()
