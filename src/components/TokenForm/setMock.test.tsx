import { render, screen } from '@testing-library/react'
import { TokenForm } from '.'
import '@testing-library/jest-dom'

jest.mock('../../hooks/TokenContext')
jest.setTimeout(10000)

describe('TokenForm() with name, key and value', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<TokenForm enableMetadataName={true} enableKeyValue={true} />)
  })
  it('default value', () => {
    expect(screen.queryByTestId('token-form-name')).toHaveValue('Sample Token')
    expect(screen.queryByTestId('token-form-description')).toHaveValue('Description of Sample Token')
    expect(screen.queryByTestId('token-form-metadata-name')).toHaveValue('Sample Metadata')
    expect(screen.queryByTestId('token-form-metadata-key')).toHaveValue('label')
    expect(screen.queryByTestId('token-form-metadata-value')).toHaveValue('test')
  })
})
describe('TokenForm() with name', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<TokenForm enableMetadataName={true} enableKeyValue={false} />)
  })
  it('default value is set and does not exist key and value', () => {
    expect(screen.queryByTestId('token-form-name')).toHaveValue('Sample Token')
    expect(screen.queryByTestId('token-form-description')).toHaveValue('Description of Sample Token')
    expect(screen.queryByTestId('token-form-metadata-name')).toHaveValue('Sample Metadata')
    expect(screen.queryByTestId('token-form-metadata-key')).toBeNull()
    expect(screen.queryByTestId('token-form-metadata-value')).toBeNull()
  })
})
describe('TokenForm() with key and value', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<TokenForm enableMetadataName={false} enableKeyValue={true} />)
  })
  it('default value is set and does not exist key and value', () => {
    expect(screen.queryByTestId('token-form-name')).toHaveValue('Sample Token')
    expect(screen.queryByTestId('token-form-description')).toHaveValue('Description of Sample Token')
    expect(screen.queryByTestId('token-form-metadata-name')).toBeNull()
    expect(screen.queryByTestId('token-form-metadata-key')).toHaveValue('label')
    expect(screen.queryByTestId('token-form-metadata-value')).toHaveValue('test')
  })
})
