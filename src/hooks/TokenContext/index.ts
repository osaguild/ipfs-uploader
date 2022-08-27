import { createContext, Dispatch, useState, useContext } from 'react'

type TokenState = {
  name: string | undefined
  description: string | undefined
  setName: Dispatch<string | undefined> | undefined
  setDescription: Dispatch<string | undefined> | undefined
}

const initialize: TokenState = {
  name: undefined,
  description: undefined,
  setName: undefined,
  setDescription: undefined,
}

const TokenContext = createContext(initialize)

const useTokenContext = () => useContext(TokenContext)

const useTokenProvider = () => {
  const [name, setName] = useState(initialize.name)
  const [description, setDescription] = useState(initialize.description)

  return {
    name,
    description,
    setName,
    setDescription,
  } as TokenState
}

export { TokenContext, TokenState, useTokenProvider, useTokenContext }
