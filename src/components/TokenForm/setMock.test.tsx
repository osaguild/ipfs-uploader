import { render, screen } from '@testing-library/react'
import { TokenForm } from '.'
import '@testing-library/jest-dom'

jest.mock('../../hooks/TokenContext')
jest.setTimeout(10000)

describe('TokenForm()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<TokenForm />)
  })
  it('default value', () => {
    expect(screen.getByTestId('token-form-name')).toHaveValue('Sample Token')
    expect(screen.getByTestId('token-form-description')).toHaveValue('Description of Sample Token')
    expect(screen.getByTestId('token-form-metadata-name')).toHaveValue('Sample Metadata')
  })
})
