import '../../utils/feedback-styles.scss'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { PlayIcon, UpdateIcon } from '@radix-ui/react-icons'
import { Flex, IconButton } from '@radix-ui/themes'
import { $currentEleve } from '@/store/store'
import { updateAppreciationEleve } from '@/store/eleveForm'
import {
  onGenerateAppreciation,
  isEvaluationComplete,
  $isGeneratingAppreciation,
} from '@/store/feedback'
import { useStore } from '@nanostores/react'
import React, { useEffect } from 'react'

// Barre d'outils simplifiée pour l'appréciation
const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className='feedback-control-group'>
      <div className='feedback-button-group'>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          title='Gras'>
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          title='Italique'>
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
          title='Barré'>
          <s>S</s>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          title='Liste à puces'>
          •
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
          title='Liste numérotée'>
          1.
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          title='Annuler'>
          ↶
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          title='Refaire'>
          ↷
        </button>
      </div>
    </div>
  )
}

// Composant éditeur avec synchronisation
const AppreciationEditor = () => {
  const { editor } = useCurrentEditor()
  const currentEleve = useStore($currentEleve)

  // 🔥 FIX : Synchroniser le contenu de l'éditeur avec le store
  useEffect(() => {
    if (!editor || !currentEleve) return

    // Gérer le cas où il n'y a pas d'appréciation (élève sans appréciation)
    let content
    if (currentEleve.appreciation && currentEleve.appreciation.trim()) {
      // Si l'appréciation existe et n'est pas vide
      content = currentEleve.appreciation.includes('<')
        ? currentEleve.appreciation
        : `<p>${currentEleve.appreciation.replace(/\n/g, '</p><p>')}</p>`
    } else {
      // Si pas d'appréciation ou appréciation vide, vider l'éditeur
      content = '<p></p>'
    }

    // Mettre à jour uniquement si le contenu a changé
    if (editor.getHTML() !== content) {
      editor.commands.setContent(content, false)
    }
  }, [editor, currentEleve?.id, currentEleve?.appreciation]) // 🔥 Ajouter l'ID pour détecter le changement d'élève

  // Gérer les changements dans l'éditeur
  useEffect(() => {
    if (!editor || !currentEleve) return

    const handleUpdate = () => {
      const html = editor.getHTML()
      updateAppreciationEleve(currentEleve.id, html)
    }

    editor.on('update', handleUpdate)

    return () => {
      editor.off('update', handleUpdate)
    }
  }, [editor, currentEleve?.id])

  return null
}

// Extensions TipTap
const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
]

function Feedback() {
  const currentEleve = useStore($currentEleve)
  const isGenerating = useStore($isGeneratingAppreciation)

  // Vérifier si l'évaluation est complète
  const playDisable = !isEvaluationComplete(currentEleve)

  // 🔥 FIX : Contenu initial vide si pas d'appréciation
  const initialContent =
    currentEleve?.appreciation && currentEleve.appreciation.trim()
      ? currentEleve.appreciation
      : '<p></p>'

  return (
    <>
      <Flex
        direction='column'
        gap='1'
        width='100%'
        justify='center'
        align='center'>
        <div className='feedback-editor-container'>
          <EditorProvider
            slotBefore={<MenuBar />}
            extensions={extensions}
            content={initialContent}
            editorProps={{
              attributes: {
                class: 'feedback-editor',
                placeholder: 'Appréciation...',
              },
            }}>
            <AppreciationEditor />
          </EditorProvider>
        </div>
      </Flex>

      <Flex
        justify='between'
        align='center'>
        <IconButton
          size='3'
          disabled={playDisable || isGenerating}
          onClick={onGenerateAppreciation}>
          <UpdateIcon />
        </IconButton>
      </Flex>
    </>
  )
}

export default Feedback
