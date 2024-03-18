import { Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <Text>Go to the <Link to = "/">Home page</Link>.</Text>
  )
}

export default NotFoundPage