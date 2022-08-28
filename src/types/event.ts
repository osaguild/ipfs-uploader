import { PinataMetadata, JsonUploadData } from './pinata'

type EventType = 'FILE_SELECTED' | 'UPLOADED' | 'UPLOAD_FAILED'

interface Event {
  eventType: EventType
}

interface FileSelectedEvent extends Event {
  eventType: 'FILE_SELECTED'
  file: File
}

interface UploadedEvent extends Event {
  eventType: 'UPLOADED'
  data: File | JsonUploadData
  metadata: PinataMetadata
}

interface UploadFailedEvent extends Event {
  eventType: 'UPLOAD_FAILED'
  message: string
}

export { Event, FileSelectedEvent, UploadedEvent, UploadFailedEvent }
