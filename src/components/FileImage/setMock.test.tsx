import { render, screen } from '@testing-library/react'
import { FileImage } from '.'
import '@testing-library/jest-dom'

jest.mock('../../hooks/FileContext')

describe('FileImage() with input', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<FileImage enableChangeName={true} imageSize="m" disable={false} />)
  })
  it('text content is sample.jpeg', () => {
    expect(screen.queryByTestId('file-image-image')).toHaveAttribute('src')
    expect(screen.queryByTestId('file-image-file-name-input')).toHaveValue('sample_name')
    expect(screen.queryByTestId('file-image-file-name-text')).toBeNull()
  })
})
describe('FileImage() with text', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<FileImage enableChangeName={false} imageSize="m" disable={false} />)
  })
  it('text content is sample.jpeg', () => {
    expect(screen.queryByTestId('file-image-image')).toHaveAttribute('src')
    expect(screen.queryByTestId('file-image-file-name-input')).toBeNull()
    expect(screen.queryByTestId('file-image-file-name-text')).toHaveTextContent('sample.jpeg')
  })
})
