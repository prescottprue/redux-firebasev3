export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB'
export const TAB_OPEN = 'TAB_OPEN'
export const TAB_CLOSE = 'TAB_CLOSE'
export const ATTEMPT_OPEN = 'ATTEMPT_OPEN'
export const RECEIVE_FILE = 'RECEIVE_FILE'
export const TAB_ERR = 'TAB_ERR'

export function navigateToTab (tabData) {
  const { index, project } = tabData
  if (!project || !project.name) {
    console.error('Project name is requried to navigate to tab')
    throw new Error('Project name is requried to navigate to tab')
  }
  return {
    type: SET_ACTIVE_TAB,
    index: index || 0,
    project
  }
}
export function closeTab (tabData) {
  const { index, project } = tabData
  if (!project || !project.name) {
    console.error('Project name is requried to navigate to tab')
    throw new Error('Project name is requried to navigate to tab')
  }
  return {
    type: TAB_CLOSE,
    index,
    project
  }
}
export function openTab (tabData) {
  const { project, title, type, file, data } = tabData
  if (!project || !project.name) {
    console.error('Project name is requried to open a tab')
    throw new Error('Project name is requried to open a tab')
  }
  return {
    type: TAB_OPEN,
    title,
    tabType: type || 'file',
    project,
    payload: file || data || {}
  }
}
export function openContentInTab (tabData) {
  const { project, title, type, file, data } = tabData
  if (!project || !project.name) {
    console.error('Project name is requried to navigate to tab')
    throw new Error('Project name is requried to navigate to tab')
  }
  return {
    type: TAB_OPEN,
    title,
    tabType: type || 'file',
    project,
    payload: data || file || {}
  }
}
