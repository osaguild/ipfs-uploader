import { render, screen } from '@testing-library/react'
import { UploadButton } from '.'
import '@testing-library/jest-dom'

jest.mock('../../hooks/FileContext')
jest.mock('../../lib/pinata')
jest.setTimeout(10000)

describe('Upload()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('button is clickable', () => {
    render(<UploadButton fileUploaded={() => true} fileUploadFailed={() => true} pinataApiJwt="dummy" />)
    expect(screen.getByTestId('upload-button')).not.toBeDisabled()
  })
  it('click button', async () => {
    const fileUploaded = jest.fn(() => true)
    const fileUploadFailed = jest.fn(() => true)
    render(<UploadButton fileUploaded={fileUploaded} fileUploadFailed={fileUploadFailed} pinataApiJwt="dummy" />)

    screen.getByTestId('upload-button').click()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    expect(fileUploaded).toHaveBeenCalled()
    expect(fileUploadFailed).not.toHaveBeenCalled()
  })
})
