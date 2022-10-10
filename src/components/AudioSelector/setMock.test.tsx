import { render, screen } from '@testing-library/react'
import { AudioSelector } from '.'
import '@testing-library/jest-dom'

jest.mock('../../hooks/AudioContext')

describe('AudioSelector() set mock', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<AudioSelector selected={() => true} />)
  })
  it('button is disabled', () => {
    expect(screen.getByTestId('audio-selector-button')).toBeDisabled()
  })
})
