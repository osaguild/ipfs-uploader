import { createContext, useState, useContext } from 'react'
import { TokenState } from '..'

const initialize: TokenState = {
  name: 'Sample Token',
  description: 'Description of Sample Token',
  metadataName: 'Sample Metadata',
  metadataKey: 'label',
  metadataValue: 'test',
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
  setMetadataKey: (metadataKey: string | undefined) => {
    console.log('[mock]TokenContext.setMetadataKey() is called.')
    console.log('[param]metadataKey:', metadataKey)
  },
  setMetadataValue: (metadataValue: string | undefined) => {
    console.log('[mock]TokenContext.setMetadataValue() is called.')
    console.log('[param]metadataValue:', metadataValue)
  },
}

const TokenContext = createContext(initialize)

const useTokenContext = () => useContext(TokenContext)

const useTokenProvider = () => {
  const [name, setName] = useState(initialize.name)
  const [description, setDescription] = useState(initialize.description)
  const [metadataName, setMetadataName] = useState(initialize.metadataName)
  const [metadataKey, setMetadataKey] = useState(initialize.metadataKey)
  const [metadataValue, setMetadataValue] = useState(initialize.metadataValue)

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
