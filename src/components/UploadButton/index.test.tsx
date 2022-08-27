import { render, screen } from '@testing-library/react'
import { UploadButton } from '.'
import '@testing-library/jest-dom'
import 'dotenv/config'

jest.setTimeout(10000)

const PINATA_API_JWT = process.env.REACT_APP_PINATA_API_JWT as string

describe('UploadButton()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('button is disabled', () => {
    render(<UploadButton fileUploaded={() => true} fileUploadFailed={() => true} pinataApiJwt={PINATA_API_JWT} />)
    expect(screen.getByTestId('upload-button-button')).toBeDisabled()
  })
})
