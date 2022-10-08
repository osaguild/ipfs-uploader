import { render, screen } from '@testing-library/react'
import { AudioView } from '.'
import '@testing-library/jest-dom'

describe('AudioView() with input', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<AudioView enableChangeName={true} disable={false} />)
  })
  it('text content is nothing', () => {
    expect(screen.queryByTestId('audio-view-audio')).toBeNull()
    expect(screen.queryByTestId('audio-view-audio-name-input')).toBeNull()
    expect(screen.queryByTestId('audio-view-audio-name-text')).toBeNull()
  })
})
describe('AudioView() with text', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<AudioView enableChangeName={false} disable={false} />)
  })
  it('text content is nothing', () => {
    expect(screen.queryByTestId('audio-view-audio')).toBeNull()
    expect(screen.queryByTestId('audio-view-audio-name-input')).toBeNull()
    expect(screen.queryByTestId('audio-view-audio-name-text')).toBeNull()
  })
})
