import { render, screen } from '@testing-library/react'
import { FileImage } from '.'
import '@testing-library/jest-dom'

jest.mock('../../hooks/FileContext')

describe('FileImage()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<FileImage />)
  })
  it('text content is sample.jpeg', () => {
    expect(screen.getByTestId('file-image-text')).toHaveTextContent('sample.jpeg')
  })
})
