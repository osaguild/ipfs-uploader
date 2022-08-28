import { render, screen } from '@testing-library/react'
import { TokenForm } from '.'
import '@testing-library/jest-dom'

jest.setTimeout(10000)

describe('TokenForm()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<TokenForm />)
  })
  it('default value is empty', () => {
    expect(screen.getByTestId('token-form-name')).toHaveValue('')
    expect(screen.getByTestId('token-form-description')).toHaveValue('')
    expect(screen.getByTestId('token-form-metadata-name')).toHaveValue('')
  })
})
