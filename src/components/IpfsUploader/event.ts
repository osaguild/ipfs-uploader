import { PinataMetadata } from '../../lib/pinata'

type EventType = 'FILE_SELECTED' | 'FILE_UPLOADED' | 'FILE_UPLOAD_FAILED'

interface Event {
  eventType: EventType
  file: File
}

interface FileSelectedEvent extends Event {
  eventType: 'FILE_SELECTED'
  file: File
}

interface FileUploadedEvent extends Event {
  eventType: 'FILE_UPLOADED'
  file: File
  metadata: PinataMetadata
}

interface FileUploadFailedEvent extends Event {
  eventType: 'FILE_UPLOAD_FAILED'
  file: File
  message: string
}

export { Event, FileSelectedEvent, FileUploadedEvent, FileUploadFailedEvent }
