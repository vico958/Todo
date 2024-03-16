import { Box, Button, Checkbox, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { schema } from './chageFullNameRules'
import { zodResolver } from "@hookform/resolvers/zod";

const ChangeFullNameForm = ({onSubmitForm}) => {
    const {register, handleSubmit, formState:{errors, isValid}} = useForm({resolver:zodResolver(schema)});
    const [hidePassword, setHidePassword] = useState(true);
  return (
    <Box maxW="400px">
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <FormControl isRequired mb="10px">
                <FormLabel>Password</FormLabel>
                <Input type={hidePassword? "password" : "text"} {...register("password")}/>
            {errors.password && (<Text color="red" fontSize="sm" m="5px">{errors.password.message}</Text>)}
            </FormControl>
            <Checkbox mb="20px" onChange={() =>setHidePassword(!hidePassword)}>Show Password</Checkbox>

            <FormControl isRequired mb="40px">
                <FormLabel>New Full Name</FormLabel>
                <Input type="text" {...register("fullName")}/>
            {errors.fullName && (<Text color="red" fontSize="sm" m="5px">{errors.fullName.message}</Text>)}
            </FormControl>
            <Button isDisabled={!isValid} colorScheme='purple' type="submit">Submit</Button>
        </form>
    </Box>
  )
}

export default ChangeFullNameForm