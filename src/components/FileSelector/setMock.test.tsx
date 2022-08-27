import { render, screen } from '@testing-library/react'
import { FileSelector } from '.'
import '@testing-library/jest-dom'

jest.mock('../../hooks/FileContext')

describe('FileSelector() set mock', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<FileSelector fileSelected={() => true} />)
  })
  it('button is disabled', () => {
    expect(screen.getByTestId('file-selector-button')).toBeDisabled()
  })
})
