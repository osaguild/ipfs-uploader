import { FunctionComponent, ChangeEvent } from 'react'
import { useTokenContext } from '../../hooks/TokenContext'
import { Input } from '@chakra-ui/react'

const TokenForm: FunctionComponent = () => {
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
  
  return (
    <div>
      <Input
        placeholder="token name"
        size="md"
        value={name}
        onChange={handleNameChange}
        data-testid="token-form-name"
      />
      <Input
        placeholder="description"
        size="md"
        value={description}
        onChange={handleDescriptionChange}
        data-testid="token-form-description"
      />
      <Input
        placeholder="metadata name"
        size="md"
        value={metadataName}
        onChange={handleMetadataNameChange}
        data-testid="token-form-metadata-name"
      />
      <Input
        placeholder="metadata key"
        size="md"
        value={metadataKey}
        onChange={handleMetadataKeyChange}
        data-testid="token-form-metadata-key"
      />
      <Input
        placeholder="metadata value"
        size="md"
        value={metadataValue}
        onChange={handleMetadataValueChange}
        data-testid="token-form-metadata-value"
      />
    </div>
  )
}

export { TokenForm }
