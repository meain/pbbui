import './App.css'

import ColorHash from 'color-hash'
import React, { useState } from 'react'

import Cards from './components/Cards/Cards'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import data from './pbb.js'

export type ProjectOption = { value: number, label: string }

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

const filterCards = (cards, search) => {
  let newCards = cards
    .map(ca =>
      ca.filter(
        c =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.header.toLowerCase().includes(search.toLowerCase())
      )
    )
    .filter(cd => cd.length > 0)
  return newCards
}

const App = () => {
  const projects = data.map((d, i) => {
    return { label: d.name, value: i }
  })

  const [project, setProject] = useState(0)
  const { name, content } = data[project]

  const fData = formatData(content)
  const [cards, setCards] = useState(fData)

  const projectChange = (project: number) => {
    setProject(project)
    setCards(filterCards(formatData(data[project].content), ''))
  }

  return (
    <div className="App">
      <Header
        name={name}
        projects={projects}
        currentProject={project}
        onSearch={filterCards}
        onProjectChange={projectChange}
      />
      <Cards cards={cards} />
      <Footer />
    </div>
  )
}

export default App
