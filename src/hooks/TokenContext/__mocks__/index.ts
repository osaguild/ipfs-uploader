import { createContext, useState, useContext } from 'react'
import { TokenState } from '..'

const initialize: TokenState = {
  name: 'Sample Token',
  description: 'Description of Sample Token',
  metadataName: 'Sample Metadata',
  setName: (name: string | undefined) => {
    console.log('[mock]TokenContext.setName() is called.')
    console.log('[param]name:', name)
  },
  setDescription: (description: string | undefined) => {
    console.log('[mock]TokenContext.setDescription() is called.')
    console.log('[param]description:', description)
  },
  setMetadataName: (metadataName: string | undefined) => {
    console.log('[mock]TokenContext.setMetadataName() is called.')
    console.log('[param]metadataName:', metadataName)
  },
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
