import { render, screen } from '@testing-library/react'
import { ImageSelector } from '.'
import '@testing-library/jest-dom'

jest.mock('../../hooks/ImageContext')

describe('ImageSelector() set mock', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<ImageSelector selected={() => true} />)
  })
  it('button is disabled', () => {
    expect(screen.getByTestId('image-selector-button')).toBeDisabled()
  })
})
