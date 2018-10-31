// @flow
import './Cards.css'

import React, { useState } from 'react'

import Card from '../Card/Card'
import data from '../../pbb.js'
import ColorHash from 'color-hash'
import swal from 'sweetalert'

const getTagColor = (tag: string): string => {
  const colorHash = new ColorHash({ lightness: 0.5 })
  let color = colorHash.rgb(tag)
  const rgbaString = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.9)`
  return rgbaString
}

const formatData = data => {
  let formatted = []
  for (let heading in data) {
    let set = []
    let accent = getTagColor(heading)
    for (let subheading in data[heading]) {
      set.push({
        header: heading,
        title: subheading,
        content: data[heading][subheading].join('\n'),
        accent,
      })
    }
    formatted.push(set)
  }
  return formatted
}

const Cards = props => {
  const fData = formatData(data)
  console.log('fData:', fData)
  const [cards, setCards] = useState(fData)
  let previousHeader = undefined
  return (
    <>
      {cards.map(set => (
        <>
          <h2 style={{ color: set[0].accent }}>{set[0].header}</h2>
          <div className="Cards">
            {set.map(card => {
              return (
                <Card
                  key={card.header + card.title}
                  onClick={() => {
                    swal(card.content)
                  }}
                  {...card}
                />
              )
            })}
          </div>
        </>
      ))}
    </>
  )
}

export default Cards
