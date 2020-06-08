import React, { useState } from 'react'
import './App.css'
import { range } from 'lodash-es'

const GRID_SIZE = 7
const FIELDS = range(1, GRID_SIZE ** 2 + 1)

const useSelectedFields = () => {
  const [selectedFields, setSelectedFields] = useState(new Set())

  const selectField = (field) => {
    const selectedFieldsArray = [...selectedFields, field]
    setSelectedFields(new Set(selectedFieldsArray))
  }
  const unSelectField = (field) => {
    const selectedFieldsArray = [...selectedFields].filter(
      (selectedField) => selectedField !== field,
    )
    setSelectedFields(new Set(selectedFieldsArray))
  }
  const resetSelectedFields = () => {
    setSelectedFields(new Set())
  }
  return {
    selectField,
    unSelectField,
    selectedFields,
    resetSelectedFields,
  }
}

const Field = ({
  index,
  children,
  isSelected,
  isFocused,
  isDisabled,
  gameId,
  onClick,
}) => (
  <li
    role="option"
    className="Field"
    aria-selected={isSelected}
    data-focused={isFocused}
    id={`${gameId}-I-${index}`}
    aria-disabled={isDisabled}
    onClick={onClick}
  >
    {children}
  </li>
)

const App = () => {
  const [gameId] = useState(`G-${Math.random()}`.slice(0, 8))
  const {
    selectField,
    unSelectField,
    selectedFields,
    resetSelectedFields,
  } = useSelectedFields()
  const [activeIndex, setActiveIndex] = useState(0)
  const maybeToggleField = (field) => {
    if (selectedFields.has(field)) {
      unSelectField(field)
      return
    }
    if (selectedFields.size < 6) {
      selectField(field)
      return
    }
  }
  const handleResetClick = (event) => {
    resetSelectedFields()
  }
  const handleContinueClick = (event) => {
    alert('Continue')
  }
  const handleFieldsKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowLeft': {
        if (activeIndex !== 0) {
          const nextIndex = activeIndex - 1
          setActiveIndex(nextIndex)
        }
        break
      }
      case 'ArrowRight': {
        if (activeIndex < FIELDS.length - 1) {
          const nextIndex = activeIndex + 1
          setActiveIndex(nextIndex)
        }
        break
      }
      case 'ArrowDown': {
        if (activeIndex / GRID_SIZE < GRID_SIZE - 1) {
          const nextIndex = activeIndex + GRID_SIZE
          setActiveIndex(nextIndex)
        }
        break
      }
      case 'ArrowUp': {
        if (activeIndex >= GRID_SIZE) {
          const nextIndex = activeIndex - GRID_SIZE
          setActiveIndex(nextIndex)
        }
        break
      }
      case 'Home': {
        if (activeIndex > 0) {
          const nextIndex = 0
          setActiveIndex(nextIndex)
        }
        break
      }
      case 'End': {
        if (activeIndex < FIELDS.length - 1) {
          const nextIndex = FIELDS.length - 1
          setActiveIndex(nextIndex)
        }
        break
      }
      case ' ': {
        const field = FIELDS[activeIndex]
        maybeToggleField(field)
        break
      }
    }
  }
  const handleFieldClick = (field, index) => {
    setActiveIndex(index)
    maybeToggleField(field)
  }
  return (
    <div className="App">
      <h1>Lottery Game</h1>
      <form className="FieldsForm">
        <div className="FieldsAndReset">
          <ol
            className="Fields"
            onKeyDown={handleFieldsKeyDown}
            role="listbox"
            aria-multiselectable="true"
            aria-label="Felder"
            tabIndex={0}
            id={gameId}
            aria-activedescendant={`${gameId}-I-${activeIndex}`}
          >
            {FIELDS.map((field, index) => (
              <Field
                isSelected={selectedFields.has(field)}
                isFocused={index === activeIndex}
                isDisabled={
                  selectedFields.size === 6 && !selectedFields.has(field)
                }
                key={index}
                onClick={() => handleFieldClick(field, index)}
                gameId={gameId}
              >
                {field}
              </Field>
            ))}
          </ol>
          <button
            type="reset"
            onClick={handleResetClick}
            className="ButtonReset"
          >
            Reset
          </button>
        </div>
        <button
          type="button"
          className="ButtonContinue"
          onClick={handleContinueClick}
          disabled={selectedFields.size < 6}
        >
          Continue
        </button>
      </form>
    </div>
  )
}

export default App
