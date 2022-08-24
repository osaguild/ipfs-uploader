import 'dotenv/config'

type Config = {
  REACT_APP_PINATA_API_JWT: string
}

const globalConfig = () => {
  const REACT_APP_PINATA_API_JWT = process.env.REACT_APP_PINATA_API_JWT
  return {
    REACT_APP_PINATA_API_JWT,
  } as Config
}

export { Config, globalConfig }
