// File isn't set
class FileNotSetError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FileNotSetError'
  }
}

export { FileNotSetError }
