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
  it('button is not clickable', () => {
    render(
      <UploadButton
        fileUploadStarted={() => true}
        fileUploaded={() => true}
        fileUploadFailed={() => true}
        pinataApiJwt={PINATA_API_JWT}
        pattern="image"
      />
    )
    expect(screen.queryByTestId('upload-button-button')).toBeDisabled()
  })
})
