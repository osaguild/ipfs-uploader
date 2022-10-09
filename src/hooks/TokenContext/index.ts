import { createContext, Dispatch, useState, useContext } from 'react'

type TokenState = {
  name: string
  description: string
  metadataName: string
  metadataKey: string
  metadataValue: string
  setName: Dispatch<string | undefined> | undefined
  setDescription: Dispatch<string | undefined> | undefined
  setMetadataName: Dispatch<string | undefined> | undefined
  setMetadataKey: Dispatch<string | undefined> | undefined
  setMetadataValue: Dispatch<string | undefined> | undefined
}

const initialize: TokenState = {
  name: '',
  description: '',
  metadataName: '',
  metadataKey: '',
  metadataValue: '',
  setName: undefined,
  setDescription: undefined,
  setMetadataName: undefined,
  setMetadataKey: undefined,
  setMetadataValue: undefined,
}

const TokenContext = createContext(initialize)

const useTokenContext = () => useContext(TokenContext)

const useTokenProvider = () => {
  const [name, setName] = useState(initialize.name)
  const [description, setDescription] = useState(initialize.description)
  const [metadataName, setMetadataName] = useState(initialize.metadataName)
  const [metadataKey, setMetadataKey] = useState(initialize.metadataName)
  const [metadataValue, setMetadataValue] = useState(initialize.metadataName)

  return {
    name,
    description,
    metadataName,
    metadataKey,
    metadataValue,
    setName,
    setDescription,
    setMetadataName,
    setMetadataKey,
    setMetadataValue,
  } as TokenState
}

export { TokenContext, TokenState, useTokenProvider, useTokenContext }
