import { render, screen } from '@testing-library/react'
import { UploadButton } from '.'
import { Metadata } from '../../lib/pinata'
import '@testing-library/jest-dom'

jest.mock('../../hooks/FileContext')
jest.mock('../../lib/pinata')
jest.setTimeout(10000)

describe('Upload()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('button is clickable', () => {
    render(<UploadButton success={() => true} failed={() => true} pinataApiJwt="dummy" />)
    expect(screen.getByTestId('upload-button')).not.toBeDisabled()
  })
  it('click button', async () => {
    const success = jest.fn((metadata: Metadata) => metadata)
    const failed = jest.fn((message: string) => message)
    render(<UploadButton success={success} failed={failed} pinataApiJwt="dummy" />)

    screen.getByTestId('upload-button').click()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    expect(success).toHaveBeenCalled()
    expect(failed).not.toHaveBeenCalled()
  })
})
