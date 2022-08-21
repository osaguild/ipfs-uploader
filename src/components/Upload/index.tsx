import { FunctionComponent } from 'react'

interface UploadProps {
  message: string
}

const Upload: FunctionComponent<UploadProps> = ({ message }) => {
  return (
    <div>
      <div>{message}</div>
    </div>
  )
}

export { Upload, UploadProps }
