import { render, screen } from '@testing-library/react'
import { FileSelector } from '../FileSelector'
import '@testing-library/jest-dom'

describe('FileSelector()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<FileSelector />)
  })
  it('button is clickable', () => {
    expect(screen.getByTestId('file-selector-button')).not.toBeDisabled()
  })
})
