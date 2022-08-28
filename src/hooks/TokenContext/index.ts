import { createContext, Dispatch, useState, useContext } from 'react'

type TokenState = {
  name: string | undefined
  description: string | undefined
  metadataName: string | undefined
  setName: Dispatch<string | undefined> | undefined
  setDescription: Dispatch<string | undefined> | undefined
  setMetadataName: Dispatch<string | undefined> | undefined
}

const initialize: TokenState = {
  name: undefined,
  description: undefined,
  metadataName: undefined,
  setName: undefined,
  setDescription: undefined,
  setMetadataName: undefined,
}

const TokenContext = createContext(initialize)

const useTokenContext = () => useContext(TokenContext)

const useTokenProvider = () => {
  const [name, setName] = useState(initialize.name)
  const [description, setDescription] = useState(initialize.description)
  const [metadataName, setMetadataName] = useState(initialize.metadataName)

  return {
    name,
    description,
    metadataName,
    setName,
    setDescription,
    setMetadataName,
  } as TokenState
}

export { TokenContext, TokenState, useTokenProvider, useTokenContext }
