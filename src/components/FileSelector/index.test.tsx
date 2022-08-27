import { render, screen } from '@testing-library/react'
import { FileSelector } from '.'
import '@testing-library/jest-dom'

describe('FileSelector()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<FileSelector fileSelected={() => true} />)
  })
  it('button is clickable', () => {
    expect(screen.getByTestId('file-selector-button')).not.toBeDisabled()
  })
})
