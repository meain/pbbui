// @flow
import './Cards.css'

import React from 'react'
import swal from 'sweetalert'

import Card from '../Card/Card'

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

const Cards = ({ cards }) => {
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
                    let opener = document.createElement('p')
                    opener.innerHTML = md.render(card.content)
                    swal({ content: opener })
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
