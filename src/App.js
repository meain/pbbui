import './App.css'

import ColorHash from 'color-hash'
import React, { useState } from 'react'

import Cards from './components/Cards/Cards'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header'
import data from './pbb.js'

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

const App = () => {
  const fData = formatData(data)
  const [cards, setCards] = useState(fData)

  const filterCards = search => {
    let newCards = fData
      .map(ca =>
        ca.filter(
          c =>
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.header.toLowerCase().includes(search.toLowerCase())
        )
      )
      .filter(cd => cd.length > 0)
    setCards(newCards)
  }

  return (
    <div className="App">
      <Header onChange={filterCards} />
      <Cards cards={cards} />
      <Footer />
    </div>
  )
}

export default App
