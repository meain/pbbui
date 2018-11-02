// @flow
import * as React from 'react'
import './Header.css'

import searchIcon from './magnifier-tool.svg'

type Props = {}
type State = {}

const Header = ({ onChange }) => {
  return (
    <div class="Header-wrapper">
      <div className="Header">
        <h1 className="Header-hero">Pure Bash Bible</h1>
        <div className="search">
          <img src={searchIcon} className="Header-icon" />
          <input
            type="text"
            placeholder="Search"
            className="Header-input"
            onChange={e => onChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default Header
