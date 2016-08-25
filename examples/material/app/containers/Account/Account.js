import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import './Account.scss'

const textFieldStyle = { width: '60%' }
const buttonStyle = { 'marginTop': '2rem', width: '20%' }
const defaultUserImageUrl = 'https://s3.amazonaws.com/kyper-cdn/img/User.png'

// redux-firebasev3
import { firebase, helpers } from 'redux-firebasev3'
const { isLoaded, isEmpty,  dataToJS, pathToJS } = helpers

@firebase([])
@connect(
  // Map state to props
  ({firebase}) => ({
    projects: dataToJS(firebase, '/projects'),
    authError: pathToJS(firebase, 'authError'),
    account: pathToJS(firebase, 'profile')
  }),
  // Place action methods into props
  (dispatch) => bindActionCreators(Actions.account, dispatch)
)
class Account extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    account: PropTypes.object,
    logout: PropTypes.func,
    uploadAvatar: PropTypes.func,
    updateAccount: PropTypes.func
  }

  state = { modalOpen: false }

  handleLogout = () => {
    this.props.logout()
    this.context.router.push('/')
  }

  handleSave = () => {
    // TODO: Handle saving image and account data at the same time
    const account = {
      name: this.refs.name.getValue(),
      email: this.refs.email.getValue()
    }
    this.props.updateAccount(account)
  }

  handleAvatarUpload = imageFile => {
    this.props.uploadAvatar(imageFile)
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  render () {
    return (
      <div className='Account'>
        <AccountDialog
          modalOpen={this.state.modalOpen}
          toggleModal={this.toggleModal}
          onSave={this.handleAvatarUpload}
        />
        <div className='Account-Settings'>
          <div className='Account-Avatar'>
            <img
              className='Account-Avatar-Current'
              src={this.props.account.avatar_url || defaultUserImageUrl}
              onClick={this.toggleModal}
            />
          </div>
          <div className='Account-Meta'>
            <TextField
              hintText='Email'
              floatingLabelText='Email'
              ref='email'
              defaultValue={this.props.account.email || 'No Email'}
              style={textFieldStyle}
            />
            <RaisedButton
              primary
              label='Save'
              onClick={this.handleSave}
              style={buttonStyle}
            />
            <RaisedButton
              label='Logout'
              onClick={this.handleLogout}
              style={buttonStyle}
            />
          </div>
        </div>
      </div>
    )
  }
}

// Place state of redux store into props of component
const mapStateToProps = ({ account, router }) => (
  {
    account,
    router
  }
)

// Place action methods into props
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(Actions.account, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Account)
