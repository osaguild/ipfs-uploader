import { render, screen } from '@testing-library/react'
import { ImageView } from '.'
import '@testing-library/jest-dom'

describe('ImageView() with input', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<ImageView enableChangeName={true} imageSize="m" disable={false} />)
  })
  it('text content is nothing', () => {
    expect(screen.queryByTestId('image-view-image')).toBeNull()
    expect(screen.queryByTestId('image-view-image-name-input')).toBeNull()
    expect(screen.queryByTestId('image-view-image-name-text')).toBeNull()
  })
})
describe('ImageView() with text', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<ImageView enableChangeName={false} imageSize="m" disable={false} />)
  })
  it('text content is nothing', () => {
    expect(screen.queryByTestId('image-view-image')).toBeNull()
    expect(screen.queryByTestId('image-view-image-name-input')).toBeNull()
    expect(screen.queryByTestId('image-view-image-name-text')).toBeNull()
  })
})
