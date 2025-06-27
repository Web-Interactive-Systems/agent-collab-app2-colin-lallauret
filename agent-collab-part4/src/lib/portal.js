import { ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import { css } from './stitches'

// import { css, theme } from '../Style'

const styles = (style = {}) =>
  css({
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    // transition: theme.transitions.inOut,
    // zIndex: theme.zIndices.overlay,
    // '&:hover': { zIndex: theme.zIndices.focus },
    '&:active': { outline: 'none' },
    ...style,
  })

const ROOT = document.getElementById('floating-ui-root')

export function ReactPortal({ id, content, style }) {
  const uuid = `portal-${id}`

  let rootEl = document.getElementById(uuid)
  if (!rootEl) {
    rootEl = createRootElement(uuid)
    rootEl.setAttribute('class', styles(style)())
    addRootElement(rootEl)
  }

  const root = ReactDOM.createRoot(rootEl)
  root.render(content)

  function remove() {
    root.unmount()
  }
  return {
    element: rootEl,
    close: () => {
      const start = Date.now()
      console.warn('==> portal item close ', start)
      remove()
      console.warn('==> portal item closed', Date.now() - start)
    },
  }
}

function createRootElement(id) {
  const rootContainer = document.createElement('div')
  rootContainer.setAttribute('id', id)
  return rootContainer
}

function addRootElement(rootElem) {
  ROOT.appendChild(rootElem)
}
