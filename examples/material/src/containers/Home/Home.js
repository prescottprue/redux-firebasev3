import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import './Home.css'

import TodoItem from '../../components/TodoItem/TodoItem'
import NewTodoPanel from '../../components/NewTodoPanel/NewTodoPanel'
import CircularProgress from 'material-ui/CircularProgress'
import { List } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'

import { firebase, helpers } from 'redux-firebasev3'
const { isLoaded, pathToJS, dataToJS } = helpers

@firebase(['/todos'])
@connect(
  ({firebase}) => ({
    todos: dataToJS(firebase, 'todos'),
    profile: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth')
  })
)
export default class Home extends Component {

  static propTypes = {
    todos: PropTypes.object,
    firebase: PropTypes.shape({
      set: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired
    }),
    auth: PropTypes.shape({
      uid: PropTypes.string
    }),
    profile: PropTypes.object
  }

  toggleDone = (todo, id) => {
    this.props.firebase.set(`/todos/${id}/done`, !todo.done)
  }

  deleteTodo = (id) => {
    this.props.firebase.remove(`/todos/${id}`)
  }

  handleAdd = (newTodo) => {
    const { firebase, auth } = this.props
    if (auth) {
      newTodo.owner = auth.uid
    }
    firebase.push('/todos', newTodo)
  }

  render () {
    const { todos } = this.props

    return (
      <div className="Home">
        <div className="Home-Info">
          from
          <span className="Home-Url">
            <a href="https://redux-firebasev3.firebaseio.com/">
              redux-firebasev3.firebaseio.com
            </a>
          </span>
        </div>
        <div className="Home-todos">
          <Paper className="Home-Paper">
            <Subheader>Todos</Subheader>
            {
              !isLoaded(todos)
                ? <CircularProgress />
                : <List style={{width: '100%'}}>
                    {
                      todos &&
                      map(todos, (todo, id) => (
                        <TodoItem
                          key={id}
                          id={id}
                          todo={todo}
                          onCompleteClick={this.toggleDone}
                          onDeleteClick={this.deleteTodo}
                        />
                      ))
                    }
                </List>
            }
          </Paper>
          <NewTodoPanel
            onNewClick={this.handleAdd}
            disabled={false}
          />
        </div>
      </div>
    )
  }
}
