import React, { useEffect, useRef } from 'react'
import * as Plot from '@observablehq/plot'
import { useStore } from '@nanostores/react'
import { $eleves } from '../store/eleves'
import { Flex } from '@radix-ui/themes'

function getMoyenne(matieres) {
  if (!matieres) return 0
  const { lecture = 0, ecriture = 0, math = 0 } = matieres
  return ((lecture + ecriture + math) / 3).toFixed(2)
}

export function PlotImageScatterplot({ eleves }) {
  const ref = useRef(null)

  const width = Math.floor(window.innerWidth * 0.8)
  const height = Math.floor(window.innerHeight * 0.8)

  const data = eleves
    .filter((eleve) => eleve.note_appreciation != null)
    .map((eleve) => ({
      nom: `${eleve.prenom} ${eleve.nom}`,
      prenom: eleve.prenom,
      nomSimple: eleve.nom,
      moyenne: Number(getMoyenne(eleve.matieres)),
      note_appreciation: Number(eleve.note_appreciation),
      avatar: eleve.picture,
      lecture: eleve.matieres.lecture,
      ecriture: eleve.matieres.ecriture,
      math: eleve.matieres.math,
    }))

  useEffect(() => {
    if (!data || !ref.current) return

    ref.current.innerHTML = ''

    const plot = Plot.plot({
      width,
      height,
      inset: 20,
      x: { label: 'Moyenne générale →', domain: [1, 5] },
      y: { grid: true, label: "↑ Note d'appréciation (1-5)", domain: [1, 5] },
      marks: [
        Plot.ruleY([0]),
        Plot.image(data, {
          x: 'moyenne',
          y: 'note_appreciation',
          src: 'avatar',
          width: 40,
          title: 'nom',
          tip: (d) => `
            <div style="min-width:180px">
              <strong>${d.prenom} ${d.nomSimple}</strong><br/>
              Lecture : ${d.lecture}/5<br/>
              Écriture : ${d.ecriture}/5<br/>
              Math : ${d.math}/5<br/>
              <hr style="margin:6px 0"/>
              <strong>Moyenne :</strong> ${d.moyenne}/5<br/>
              <strong>Note appréciation :</strong> ${d.note_appreciation}/5
            </div>
          `,
        }),
      ],
    })

    ref.current.appendChild(plot)

    return () => {
      plot.remove()
    }
    // eslint-disable-next-line
  }, [eleves, width, height])

  return (
    <div
      ref={ref}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        margin: 'auto',
      }}
    />
  )
}

export default function Stats() {
  const eleves = useStore($eleves)

  return (
    <Flex
      className='App'
      justify='center'
      align='center'
      style={{ width: '100vw', height: '100vh' }}>
      <PlotImageScatterplot eleves={eleves} />
    </Flex>
  )
}
