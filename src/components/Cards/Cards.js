// @flow
import './Cards.css'

import React from 'react'
import swal from 'sweetalert'
import emptyImage from './undraw_empty_xct9.svg'

import Card, { type CardType } from '../Card/Card'

type Props = {
  cards: Array<Array<CardType>>,
}

var Remarkable = require('remarkable')
var hljs = require('highlight.js')

var md = new Remarkable('full', {
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: true,
  linkTarget: '',
  typographer: false,
  quotes: '“”‘’',
  highlight: function(str, lang) {
    if (lang === 'shell') lang = 'sh'
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }

    try {
      return hljs.highlightAuto(str).value
    } catch (__) {}

    return ''
  },
})

const Cards = ({ cards }: Props) => {
  return (
    <div className="Cards-wrapper">
      {cards.length === 0 && (
        <div className="no-content">
          <img src={emptyImage} alt="" />
          <div>Woops, I could not find anything for that search</div>
        </div>
      )}
      {cards.map(set => (
        <>
          <h2 style={{ color: set[0].accent }}>{set[0].header}</h2>
          <div className="Cards">
            {set.map(card => {
              return (
                <Card
                  key={card.header + card.title}
                  onClick={() => {
                    let opener = document.createElement('p')
                    opener.innerHTML =
                      `<h4 style="color: ${card.accent};text-align: center;">${card.title}</h4>` +
                      md.render(card.content)
                    swal({ content: opener })
                  }}
                  {...card}
                />
              )
            })}
          </div>
        </>
      ))}
    </div>
  )
}

export default Cards
