import { createContext, Dispatch, useState, useContext } from 'react'

type TokenState = {
  name: string | undefined
  description: string | undefined
  metadataName: string | undefined
  metadataKey: string | undefined
  metadataValue: string | undefined
  setName: Dispatch<string | undefined> | undefined
  setDescription: Dispatch<string | undefined> | undefined
  setMetadataName: Dispatch<string | undefined> | undefined
  setMetadataKey: Dispatch<string | undefined> | undefined
  setMetadataValue: Dispatch<string | undefined> | undefined
}

const initialize: TokenState = {
  name: undefined,
  description: undefined,
  metadataName: undefined,
  metadataKey: undefined,
  metadataValue: undefined,
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
