import { render, screen } from '@testing-library/react'
import { FileImage } from '../FileImage'

jest.mock('../../hooks/useFileContext')

describe('FileImage()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<FileImage />)
  })
  it('[success]', () => {
    expect(screen.getByText('sample.jpeg')).toBeTruthy()
  })
})
