import { useEffect, useRef } from 'react'
import * as Plot from '@observablehq/plot'
import { useStore } from '@nanostores/react'
import { $eleves } from '../store/eleves'
import { Flex } from '@radix-ui/themes'
import { computePosition, flip, shift, offset } from '@floating-ui/dom'
import { ReactPortal } from '@/lib/portal'

function ToolTip({ prenom, nom, lecture, ecriture, math }) {
  return (
    <div
      style={{
        background: 'white',
        border: '1px solid #ccc',
        padding: 8,
        borderRadius: 4,
      }}>
      <div>
        <strong>
          {prenom} {nom}
        </strong>
      </div>
      <div>Lecture: {lecture}</div>
      <div>Écriture: {ecriture}</div>
      <div>Math: {math}</div>
    </div>
  )
}

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
      all: `${eleve.prenom} ${eleve.nom}
Appréciation: ${eleve.note_appreciation}
Lecture: ${eleve.matieres.lecture}
Écriture: ${eleve.matieres.ecriture}
Math: ${eleve.matieres.math}`,
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
          // title: 'all',
          // tip: () => '',
        }),
      ],
    })

    // Store the ref value in a variable to use in cleanup
    const container = ref.current

    const handleMouseMove = (e) => {
      if (e.target?.nodeName.toLowerCase() !== 'image') {
        return
      }
      // Trouver l'index de l'image survolée
      const images = Array.from(container.querySelectorAll('image'))
      const idx = images.indexOf(e.target)
      if (idx === -1) return
      const eleveData = data[idx]
      if (!eleveData) return

      const { clientX, clientY } = e
      const virtualEl = {
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: clientX,
            y: clientY,
            top: clientY,
            left: clientX,
            right: clientX,
            bottom: clientY,
          }
        },
      }

      // Supprimer l'ancien tooltip s'il existe
      let tooltip = document.getElementById('custom-tooltip')
      if (tooltip) tooltip.remove()

      const { element } = ReactPortal({
        id: 'custom-tooltip',
        content: (
          <ToolTip
            prenom={eleveData.prenom}
            nom={eleveData.nomSimple}
            lecture={eleveData.lecture}
            ecriture={eleveData.ecriture}
            math={eleveData.math}
          />
        ),
      })

      setTimeout(() => {
        computePosition(virtualEl, element, {
          placement: 'right',
          middleware: [offset(10), flip(), shift({ padding: 110 })],
        }).then(({ x, y }) => {
          Object.assign(element.style, {
            left: `${x}px`,
            top: `${y}px`,
            position: 'fixed',
            zIndex: 9999,
            display: 'block',
          })
        })
      }, 1)
    }

    const handleMouseLeave = () => {
      const tooltip = document.getElementById('custom-tooltip')
      if (tooltip) {
        tooltip.style.display = 'none'
      }
    }

    container.appendChild(plot)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      plot.remove()
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      const tooltip = document.getElementById('custom-tooltip')
      if (tooltip) {
        tooltip.remove()
      }
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
