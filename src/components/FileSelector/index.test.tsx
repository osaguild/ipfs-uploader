import { render, screen } from '@testing-library/react'
import { FileSelector } from '../FileSelector'
import '@testing-library/jest-dom'

jest.mock('../../hooks/FileContext')

describe('FileSelector()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<FileSelector />)
  })
  it('[success]show button', () => {
    expect(screen.getByText('Select')).toBeTruthy()
  })
  it('[success]set file, button is disabled', () => {
    expect(screen.getByText('Select')).toBeDisabled()
  })
})
