import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from './react-redux'

class ThemeSwitch extends Component {
  static propTypes = {
    themeColor: PropTypes.string,
    onUpdateThemeColor: PropTypes.func
  }

  onUpdateThemeColor (color) {
    this.props.onUpdateThemeColor && this.props.onUpdateThemeColor(color)
  }

  render () {
    return (
      <div className="comment-field-button" style={{marginBottom: '10px'}}>
        <button onClick={this.onUpdateThemeColor.bind(this, '#e5eef4')} className="g-bgcolor-front" style={{marginRight: '10px'}}>前景色</button>
        <button onClick={this.onUpdateThemeColor.bind(this, '#323a40')} className="g-bgcolor-back">后景色</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateThemeColor: (color) => {
      dispatch({ type: 'CHANGE_COLOR', themeColor: color })
    }
  }
}

ThemeSwitch = connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch)

export default ThemeSwitch