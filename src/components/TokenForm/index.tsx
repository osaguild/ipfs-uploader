import { FunctionComponent, ChangeEvent } from 'react'
import { useTokenContext } from '../../hooks/TokenContext'
import { Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'

interface TokenFormProps {
  enableMetadataName: boolean
  enableKeyValue: boolean
}

const TokenForm: FunctionComponent<TokenFormProps> = ({ enableMetadataName, enableKeyValue }) => {
  const {
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
  } = useTokenContext()

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setName) setName(e.target.value)
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setDescription) setDescription(e.target.value)
  }

  const handleMetadataNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setMetadataName) setMetadataName(e.target.value)
  }

  const handleMetadataKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setMetadataKey) setMetadataKey(e.target.value)
  }

  const handleMetadataValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setMetadataValue) setMetadataValue(e.target.value)
  }

  const nameIsValid = !name ? true : name?.length === 0 ? true : false
  const descriptionIsValid = !description ? true : description?.length === 0 ? true : false

  return (
    <>
      <FormControl id="name" isInvalid={nameIsValid} isRequired>
        <FormLabel>name</FormLabel>
        <Input
          placeholder="token 001"
          size="md"
          value={name}
          onChange={handleNameChange}
          data-testid="token-form-name"
        />
        {nameIsValid && <FormErrorMessage>name is required</FormErrorMessage>}
      </FormControl>
      <FormControl id="description" isInvalid={descriptionIsValid} isRequired>
        <FormLabel>description</FormLabel>
        <Input
          placeholder="this is token 001"
          size="md"
          value={description}
          onChange={handleDescriptionChange}
          data-testid="token-form-description"
        />
        {descriptionIsValid && <FormErrorMessage>description is required</FormErrorMessage>}
      </FormControl>
      {enableMetadataName && (
        <FormControl id="metadata-name">
          <FormLabel>metadata name</FormLabel>
          <Input
            placeholder="metadata 001"
            size="md"
            value={metadataName}
            onChange={handleMetadataNameChange}
            data-testid="token-form-metadata-name"
          />
        </FormControl>
      )}
      {enableKeyValue && (
        <>
          <FormControl id="metadata-key">
            <FormLabel>metadata key</FormLabel>
            <Input
              placeholder="category"
              size="md"
              value={metadataKey}
              onChange={handleMetadataKeyChange}
              data-testid="token-form-metadata-key"
            />
          </FormControl>
          <FormControl id="metadata-value">
            <FormLabel>metadata value</FormLabel>
            <Input
              placeholder="art"
              size="md"
              value={metadataValue}
              onChange={handleMetadataValueChange}
              data-testid="token-form-metadata-value"
            />
          </FormControl>
        </>
      )}
    </>
  )
}

export { TokenForm }
