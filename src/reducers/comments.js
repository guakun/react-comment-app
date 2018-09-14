// action types
const INIT_COMMENTS = 'INIT_COMMENTS'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'

export default (state, action) => {
  if (!state) {
    state = { comments: [] }
  }

  switch (action.type) {
    case INIT_COMMENTS:
      console.log('action', action)
      return { comments: action.comments }
    case ADD_COMMENT:
      return { comments: [...state.comments, action.comment]}
    case DELETE_COMMENT:
      return { comments: [...state.comments.splice(0, action.commentIndex), ...state.comments.splice(action.commentIndex + 1)] }
    default:
      return state
  }
}

// action creators
export const initComments = (comments) => {
  return { type: INIT_COMMENTS, comments}
}

export const addComment = (comment) => {
  return { type: ADD_COMMENT, comment}
}

export const deleteComment = (commentIndex) => {
  return { type: DELETE_COMMENT, commentIndex}
}