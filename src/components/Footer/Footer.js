// @flow
import * as React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className="Footer">
      <span>
        <span>Contents by:</span>{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/dylanaraps">
          dylanaraps
        </a>
      </span>
      <span>
        <span>Webpage:</span>{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/meain/pbbui">
          meain/pbbui
        </a>
      </span>
    </div>
  )
}

export default Footer
