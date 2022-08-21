import * as React from 'react'

interface UploadProps {
  message: string
}

const Upload: React.FunctionComponent<UploadProps> = ({ message }) => {
  return (
    <div>
      <div>{message}</div>
    </div>
  )
}

export default Upload
