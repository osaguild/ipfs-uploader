import { UploadLog, JsonUploadData } from './pinata'

type EventType = 'FILE_SELECTED' | 'VALIDATION_ERROR' | 'UPLOADING' | 'SUCCESS' | 'FAILED'
type DataType = 'IMAGE' | 'AUDIO'
type UploadedData = {
  data: File | JsonUploadData
  log: UploadLog
}

interface Event {
  eventType: EventType
}

interface FileSelectedEvent extends Event {
  eventType: 'FILE_SELECTED'
  dataType: DataType
  file: File
}

interface ValidationErrorEvent extends Event {
  eventType: 'VALIDATION_ERROR'
  message: string
}

interface UploadingEvent extends Event {
  eventType: 'UPLOADING'
}

interface SuccessEvent extends Event {
  eventType: 'SUCCESS'
  uploadedData: UploadedData[]
}

interface FailedEvent extends Event {
  eventType: 'FAILED'
  message: string
}

export {
  EventType,
  DataType,
  UploadedData,
  Event,
  FileSelectedEvent,
  ValidationErrorEvent,
  UploadingEvent,
  SuccessEvent,
  FailedEvent,
}
