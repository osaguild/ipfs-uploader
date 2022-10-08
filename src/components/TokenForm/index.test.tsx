import { render, screen } from '@testing-library/react'
import { TokenForm } from '.'
import '@testing-library/jest-dom'

jest.setTimeout(10000)

describe('TokenForm() with name, key and value', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<TokenForm enableMetadataName={true} enableKeyValue={true} disable={false} />)
  })
  it('default value is empty', () => {
    expect(screen.queryByTestId('token-form-name')).toHaveValue('')
    expect(screen.queryByTestId('token-form-description')).toHaveValue('')
    expect(screen.queryByTestId('token-form-metadata-name')).toHaveValue('')
    expect(screen.queryByTestId('token-form-metadata-key')).toHaveValue('')
    expect(screen.queryByTestId('token-form-metadata-value')).toHaveValue('')
  })
})
describe('TokenForm() with name', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<TokenForm enableMetadataName={true} enableKeyValue={false} disable={false} />)
  })
  it('default value is empty and does not exist key and value', () => {
    expect(screen.queryByTestId('token-form-name')).toHaveValue('')
    expect(screen.queryByTestId('token-form-description')).toHaveValue('')
    expect(screen.queryByTestId('token-form-metadata-name')).toHaveValue('')
    expect(screen.queryByTestId('token-form-metadata-key')).toBeNull()
    expect(screen.queryByTestId('token-form-metadata-value')).toBeNull()
  })
})
describe('TokenForm() with key and value', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<TokenForm enableMetadataName={false} enableKeyValue={true} disable={false} />)
  })
  it('default value is empty and does not exist name', () => {
    expect(screen.queryByTestId('token-form-name')).toHaveValue('')
    expect(screen.queryByTestId('token-form-description')).toHaveValue('')
    expect(screen.queryByTestId('token-form-metadata-name')).toBeNull()
    expect(screen.queryByTestId('token-form-metadata-key')).toHaveValue('')
    expect(screen.queryByTestId('token-form-metadata-value')).toHaveValue('')
  })
})
