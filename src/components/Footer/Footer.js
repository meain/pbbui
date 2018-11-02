// @flow
import * as React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className="Footer">
      <span>
        <span>Content:</span>{' '}
        <a target="_blank" href="https://github.com/dylanaraps/pure-bash-bible">
          dylanaraps/pure-bash-bible
        </a>
      </span>
      <span>
        <span>Webpage:</span>{' '}
        <a target="_blank" href="https://github.com/meain/pbbui">
          meain/pbbui
        </a>
      </span>
    </div>
  )
}

export default Footer
