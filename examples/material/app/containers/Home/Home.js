import React, { Component, PropTypes } from 'react' // eslint-disable-line
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { map } from 'lodash'

// Components
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import Theme from '../../theme'

import './Home.scss'

// redux-firebasev3
import { firebase, helpers } from 'redux-firebasev3'
const { isLoaded, isEmpty, dataToJS } = helpers

@firebase(['/cars'])
@connect(
  // Map state to props
  ({firebase}) => ({
    cars: dataToJS(firebase, '/cars')
  })
)
export default class Home extends Component {
  static propTypes = {
    cars: PropTypes.object
  }

  render () {
    const { cars } = this.props
    return (
      <div className='Home' style={{ color: Theme.palette.primary2Color }}>
        <div>
          <div className='Home-Hero'>
            <div className='Home-Logo'>
              {
                isLoaded
                ? map(cars, (project, i) =>
                    <div key={`Project-${i}`}>
                      <span>
                        { project.name || 'no name'}
                      </span>
                    </div>
                  )
                : <CircularProgress size={2} />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
