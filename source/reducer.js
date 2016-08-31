import {fromJS} from 'immutable'
import {
  SET,
  SET_PROFILE,
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  NO_VALUE,
  AUTHENTICATION_INIT_STARTED,
  AUTHENTICATION_INIT_FINISHED
} from './constants'

const initialState = fromJS({
  auth: undefined,
  authError: undefined,
  profile: undefined,
  isLoading: false,
  data: {},
  snapshot: {}
})

const pathToArr = path => path.split(/\//).filter(p => !!p)

export default (state = initialState, action = {}) => {
  const {path} = action
  let pathArr
  let retVal

  switch (action.type) {

    case SET:
      const {data, snapshot} = action
      pathArr = pathToArr(path)

      retVal = (data !== undefined)
        ? state.setIn(['data', ...pathArr], fromJS(data))
        : state.deleteIn(['data', ...pathArr])

      retVal = (snapshot !== undefined)
        ? retVal.setIn(['snapshot', ...pathArr], fromJS(snapshot))
        : retVal.deleteIn(['snapshot', ...pathArr])

      return retVal

    case NO_VALUE:
      pathArr = pathToArr(path)
      retVal = state.setIn(['data', ...pathArr], fromJS({}))
      retVal = retVal.setIn(['snapshot', ...pathArr], fromJS({}))
      return retVal

    case SET_PROFILE:
      const {profile} = action
      return (profile !== undefined)
        ? state.setIn(['profile'], fromJS(profile))
        : state.deleteIn(['profile'])

    case LOGOUT:
      return fromJS({
        auth: null,
        authError: null,
        profile: null,
        isLoading: false,
        data: {},
        snapshot: {}
      })

    case LOGIN:
      return state.setIn(['auth'], fromJS(action.auth))
                  .setIn(['authError'], null)

    case LOGIN_ERROR:
      return state
              .setIn(['authError'], action.authError)
              .setIn(['auth'], null)
              .setIn(['profile'], null)

    // case AUTHENTICATION_INIT_STARTED:
    //   return state.setIn(['isLoading'], true) // state.setIn not a function

    case AUTHENTICATION_INIT_STARTED:
      return Object.assign({}, state, { isLoading: true })

    case AUTHENTICATION_INIT_FINISHED:
      return Object.assign({}, state, { isLoading: false })

    default:
      return state

  }
}
