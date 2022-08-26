import { render, screen } from '@testing-library/react'
import { FileImage } from '.'
import '@testing-library/jest-dom'

describe('FileImage()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<FileImage />)
  })
  it('text content is nothing', () => {
    expect(screen.queryByTestId('file-image-text')).toBeNull()
    expect(screen.queryByTestId('file-image-image')).toBeNull()
  })
})
