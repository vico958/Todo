import { Flex } from '@chakra-ui/react'
import React from 'react'
import Loader from './Loader'

const LoaderAfterAction = ({justify="center", mt="200px"}) => {
    return (
        <Flex justify={justify} mt={mt}>
          <Loader/>
        </Flex>
    )

}

export default LoaderAfterAction