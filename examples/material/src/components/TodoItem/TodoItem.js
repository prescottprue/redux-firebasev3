import React, { PropTypes, Component } from 'react'
import './TodoItem.css'
import { ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import Delete from 'material-ui/svg-icons/action/delete'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    id: PropTypes.string,
    onDeleteClick: PropTypes.func,
    onCompleteClick: PropTypes.func
  }

  render(){
    const {
      todo,
      id,
      onCompleteClick,
      onDeleteClick
    } = this.props

    const checkbox = (
      <Checkbox
        defaultChecked={todo.done}
        onCheck={() => { onCompleteClick(todo, id) }}
      />
    )

    const deleteButton = (
      <Delete onClick={() => { onDeleteClick(id) }} />
    )

    return (
      <div>
        <ListItem
          leftIcon={checkbox}
          rightIcon={deleteButton}
          secondaryText={
            <p>
              {todo.owner || 'none'}<br/>
              {todo.text}
            </p>
          }
          secondaryTextLines={2}
        />
      </div>
    )
  }
}
