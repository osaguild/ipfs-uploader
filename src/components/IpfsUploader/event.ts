type EventType = 'FILE_SELECTED' | 'FILE_UPLOADED' | 'FILE_UPLOAD_FAILED'

interface Event {
  eventType: EventType
  file: File
  message: string
}

interface FileSelectedEvent extends Event {
  eventType: 'FILE_SELECTED'
  file: File
  message: string
}

interface FileUploadedEvent extends Event {
  eventType: 'FILE_UPLOADED'
  file: File
  message: string
}

interface FileUploadFailedEvent extends Event {
  eventType: 'FILE_UPLOAD_FAILED'
  file: File
  message: string
}

export { Event, FileSelectedEvent, FileUploadedEvent, FileUploadFailedEvent }
