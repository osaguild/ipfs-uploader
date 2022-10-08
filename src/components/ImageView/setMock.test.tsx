import { render, screen } from '@testing-library/react'
import { ImageView } from '.'
import '@testing-library/jest-dom'

jest.mock('../../hooks/ImageContext')

describe('ImageView() with input', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<ImageView enableChangeName={true} imageSize="m" disable={false} />)
  })
  it('text content is sample_image', () => {
    expect(screen.queryByTestId('image-view-image')).toHaveAttribute('src')
    expect(screen.queryByTestId('image-view-image-name-input')).toHaveValue('sample_image')
    expect(screen.queryByTestId('image-view-image-name-text')).toBeNull()
  })
})
describe('ImageView() with text', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<ImageView enableChangeName={false} imageSize="m" disable={false} />)
  })
  it('text content is sample.jpeg', () => {
    expect(screen.queryByTestId('image-view-image')).toHaveAttribute('src')
    expect(screen.queryByTestId('image-view-image-name-input')).toBeNull()
    expect(screen.queryByTestId('image-view-image-name-text')).toHaveTextContent('sample.jpeg')
  })
})
