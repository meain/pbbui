// @flow
import * as React from 'react'
import './Card.css'

type Props = {
  header: string,
  title: string,
}
type State = {}

const Card = ({ header, title, accent, onClick }) => {
  return (
    <div className="Card" onClick={onClick}>
      <div
        className="header"
        style={{
          color: accent,
        }}>
        {header}
      </div>
      <div className="title">{title}</div>
    </div>
  )
}

export default Card
