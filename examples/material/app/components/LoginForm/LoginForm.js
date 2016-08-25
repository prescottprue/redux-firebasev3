import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import './LoginForm.scss'
import TextField from 'material-ui/TextField'

const fieldStyle = { width: '80%' }
const buttonStyle = { width: '100%' }

export default class LoginForm extends Component {

  static propTypes = {
    account: PropTypes.object,
    onLogin: PropTypes.func
  }

  render () {
    const { account } = this.props
    return (
      <form className='LoginForm' onSubmit={this.props.onLogin}>
        <TextField
          floatingLabelText='Email'
          name="email"
        />
        <TextField
          floatingLabelText='Password'
          name='password'
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
        <div className='LoginForm-Options'>
          <div className='LoginForm-Remember'>
            <Checkbox
              name='remember'
              value='remember'
              label='Remember'
              labelStyle={{ fontSize: '.8rem' }}
            />
          </div>
          <Link className='LoginForm-Recover-Link' to='/recover'>
            Forgot Password?
          </Link>
        </div>
      </form>
    )
  }
}