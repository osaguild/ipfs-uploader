import { render, screen } from '@testing-library/react'
import { AudioSelector } from '.'
import '@testing-library/jest-dom'

describe('AudioSelector()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<AudioSelector audioSelected={() => true} />)
  })
  it('button is clickable', () => {
    expect(screen.getByTestId('audio-selector-button')).not.toBeDisabled()
  })
})
