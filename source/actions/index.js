import * as auth from './auth'
import * as query from './query'

export { auth, query }
export default Object.assign({}, auth, query)
