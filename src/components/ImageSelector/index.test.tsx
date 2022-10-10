import { render, screen } from '@testing-library/react'
import { ImageSelector } from '.'
import '@testing-library/jest-dom'

describe('ImageSelector()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<ImageSelector selected={() => true} />)
  })
  it('button is clickable', () => {
    expect(screen.getByTestId('image-selector-button')).not.toBeDisabled()
  })
})
