import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import './LoginForm.css'
import TextField from 'material-ui/TextField'

const buttonStyle = { width: '100%' }
const fieldStyle = { width: '80%' }

export default class LoginForm extends Component {

  static propTypes = {
    account: PropTypes.object,
    onLogin: PropTypes.func
  }

  state = {
    errors: { email: null, password: null }
  }

  handleTextChange = (name, value) => {

    this.setState({text: value });
  }

  render () {
    const { account, onLogin } = this.props
    const { errors } = this.state

    const handleSubmit = (e) => {
      e.preventDefault()
      const { email, password } = this.state
      onLogin({ email, password })
    }

    return (
      <form className='LoginForm' onSubmit={handleSubmit}>
        <TextField
          floatingLabelText='Email'
          name="email"
          onChange={({ target }) => { this.setState({email: target.value}) }}
          errorText={errors.email}
          style={fieldStyle}
        />
        <TextField
          floatingLabelText='Password'
          name='password'
          type='password'
          errorText={errors.password}
          onChange={({ target }) => { this.setState({password: target.value}) }}
          style={fieldStyle}
        />
        <div className='LoginForm-Submit'>
          <RaisedButton
            label='Login'
            secondary
            type='submit'
            disabled={account && account.isFetching}
            style={buttonStyle}
          />
        </div>
      </form>
    )
  }
}
