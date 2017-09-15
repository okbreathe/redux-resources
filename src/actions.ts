import resourceActionTypes from './action_types'
import { Action, ResourceActions } from './types'
import form from './form'

/**
 *
 * Generates a standard set of resource action creators corresponding to
 *
 * @param {String} resourceName  - name of the resource
 * @return {Object}
 *
 */
export default function resourceActions<T>(resourceName: string): ResourceActions<T> {
  if (!resourceName) throw new Error('Expected resource name')
  const actionTypes = resourceActionTypes(resourceName)
  const actions = Object.keys(actionTypes).reduce((acc: any, key) => {
    acc[key] = createAction(actionTypes[key])
    return acc
  }, {})
  actions.resourceForm = form(resourceName, actions)
  return actions
}

function createAction<T>(type: string): (payload: T, meta?: any) => Action<T> {
  return (payload: T, meta?: any) => ({ type, payload, meta, error: type.substr(-7) === "FAILURE" })
}
