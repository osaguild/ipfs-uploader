import { render, screen } from '@testing-library/react'
import { FileImage } from '.'
import '@testing-library/jest-dom'

describe('FileImage()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<FileImage />)
  })
  it('text content is nothing', () => {
    expect(screen.getByTestId('file-image-text')).toHaveTextContent('')
  })
})
