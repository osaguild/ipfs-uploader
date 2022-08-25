import { render, screen } from '@testing-library/react'
import { FileSelector } from '../FileSelector'
import '@testing-library/jest-dom'

jest.mock('../../hooks/FileContext')

describe('FileSelector() set mock', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<FileSelector />)
  })
  it('button is disabled', () => {
    expect(screen.getByTestId('file-selector-button')).toBeDisabled()
  })
})
