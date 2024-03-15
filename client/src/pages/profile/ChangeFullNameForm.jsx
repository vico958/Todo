import { Box, Button, Checkbox, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const ChangeFullNameForm = ({onSubmitForm}) => {
    const {register, handleSubmit} = useForm();
    const [hidePassword, setHidePassword] = useState(true);
  return (
    <Box maxW="400px">
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <FormControl isRequired mb="10px">
                <FormLabel>Password</FormLabel>
                <Input type={hidePassword? "password" : "text"} {...register("password")}/>
            </FormControl>
            <Checkbox mb="20px" onChange={() =>setHidePassword(!hidePassword)}>Show Password</Checkbox>

            <FormControl isRequired mb="40px">
                <FormLabel>New Full Name</FormLabel>
                <Input type="text" {...register("fullName")}/>
            </FormControl>

            <Button colorScheme='purple' type="submit">Submit</Button>
        </form>
    </Box>
  )
}

export default ChangeFullNameForm