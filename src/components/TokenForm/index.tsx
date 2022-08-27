import { FunctionComponent, ChangeEvent } from 'react'
import { useTokenContext } from '../../hooks/TokenContext'
import { Input } from '@chakra-ui/react'

const TokenForm: FunctionComponent = () => {
  const { name, description, setName, setDescription } = useTokenContext()

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setName) setName(e.target.value)
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setDescription) setDescription(e.target.value)
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
    </div>
  )
}

export { TokenForm }
