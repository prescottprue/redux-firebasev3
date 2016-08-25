export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export function hydrateUser (user) {
  return {
    type: LOGIN_SUCCESS,
    response: user
  }
}
