import { createContext, useState, useContext } from 'react'
import { TokenState } from '..'

const initialize: TokenState = {
  name: 'Sample Token',
  description: 'Description of Sample Token',
  setName: (name: string | undefined) => {
    console.log('[mock]TokenContext.setName() is called.')
    console.log('[param]name:', name)
  },
  setDescription: (description: string | undefined) => {
    console.log('[mock]TokenContext.setDescription() is called.')
    console.log('[param]description:', description)
  },
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
