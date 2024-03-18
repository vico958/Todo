import { Text, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <Flex justify="center" mt="40px" flexDirection="column" alignItems="center">
        <Flex>
            <Text>We are sorry but it seems you arrived to a path that we don't support</Text>
        </Flex>
        <Flex>
            <Text>
                Go back to <Link to="/" style={{ textDecoration: 'underline', color:"blue"}}>Home page</Link>.
            </Text>
        </Flex>
    </Flex>
  )
}

export default NotFoundPage