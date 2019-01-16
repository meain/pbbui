// @flow
import './Header.css'

import * as React from 'react'
import Select from 'react-select'

import type { ProjectOption } from '../../App'
import searchIcon from './magnifier-tool.svg'

type Props = {
  name: string,
  projects: Array<ProjectOption>,
  currentProject: number,
  onSearch: string => mixed,
  onProjectChange: number => mixed,
}

const Header = ({ name, projects, currentProject, onSearch, onProjectChange }: Props) => {
  const colourStyles = {
    control: styles => ({
      ...styles,
      border: 'none',
      borderBottom: '1px solid #ccc',
      borderRadius: '0',
      margin: '6px 0'
    }),
    menu: styles => ({
      ...styles,
      borderRadius: '0',
    }),
    input: styles => ({ ...styles, width: '300px' }),
  }

  return (
    <div className="Header-wrapper">
      <div className="Header">
        <Select
          value={projects[currentProject]}
          styles={colourStyles}
          onChange={option => onProjectChange(option.value)}
          options={projects}
        />
        {/* <h1 className="Header-hero">{name}</h1> */}
        <div className="search">
          <img src={searchIcon} className="Header-icon" alt="" />
          <input
            type="text"
            placeholder="Search"
            className="Header-input"
            onChange={e => onSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default Header
