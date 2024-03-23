import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
import React from 'react'

const Error = ({message}) => { 
  return (
    <Alert
  status='error'
  variant='subtle'
  flexDirection='column'
  alignItems='center'
  justifyContent='center'
  textAlign='center'
  height='200px'
>
  <AlertIcon boxSize='40px' mr={0} />
  <AlertTitle mt={4} mb={1} fontSize='lg'>
    Something went wrong
  </AlertTitle>
  <AlertDescription maxWidth='sm'>
    {message}
  </AlertDescription>
</Alert>
  )
}

export default Error