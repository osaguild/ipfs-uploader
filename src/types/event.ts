import { UploadLog, JsonUploadData } from './pinata'

type EventType = 'SELECTED' | 'UPLOADING' | 'SUCCESS' | 'FAILED'
type DataType = 'IMAGE' | 'AUDIO'
type UploadedData = {
  data: File | JsonUploadData
  log: UploadLog
}

interface Event {
  eventType: EventType
}

interface SelectedEvent extends Event {
  eventType: 'SELECTED'
  dataType: DataType
  file: File
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

export { EventType, DataType, UploadedData, Event, SelectedEvent, UploadingEvent, SuccessEvent, FailedEvent }
