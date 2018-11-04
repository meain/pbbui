// @flow
import * as React from 'react'
import './Card.css'

export type CardType = {
  header: string,
  title: string,
  accent: string,
  content: string,
  onClick: void => mixed,
}
type Props = CardType

const Card = ({ header, title, accent, onClick }: Props) => {
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
