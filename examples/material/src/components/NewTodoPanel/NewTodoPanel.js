import React, { PropTypes, Component } from 'react'
import './NewTodoPanel.css'

import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Subheader from 'material-ui/Subheader'

export default class NewTodoPanel extends Component {

  static propTypes = {
    onNewClick: PropTypes.func,
    disabled: PropTypes.bool
  }

  handleAdd = () => {
    const { newTodo } = this.refs
    this.props.onNewClick({ text: newTodo.value, done:false })
    newTodo.value = ''
  }

  render () {
    const { profile, disabled } = this.props

    return (
      <Paper className="NewTodoPanel-Paper">
        <Subheader>New Todo</Subheader>
        <TextField
          floatingLabelText="New Todo Text"
          ref="newTodo"
          className="NewTodoPanel-Input"
        />
        <IconButton
          onClick={this.handleAdd}
          disabled={disabled}
          tooltipPosition={'top-center'}
          tooltip={profile ? 'Add Todo' : 'Login To Add Todo'}
        >
          <ContentAdd />
        </IconButton>
      </Paper>
    )
  }
}
