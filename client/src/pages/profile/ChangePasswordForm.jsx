import { Box, Button, FormControl, FormLabel, Input, Text, Checkbox } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from "./changePasswordRules"
import { passwordMustContain } from "../../services/schemasRules";
import { handlePasswordKeyPress } from '../../services/general';

const ChangePasswordForm = ({onSubmitForm}) => {
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const {register, handleSubmit, formState:{errors, isValid}, watch} = useForm({resolver:zodResolver(schema)});
    const newPassword = watch("newPassword", "");
    const repeatNewPassword = watch("repeatNewPassword", "");
    const [checkHideOldPasswrod, setCheckHideOldPasswrod] = useState(true);
    const [checkHideNewPassword, setCheckHideNewPassword] = useState(true);
    const [checkHideRepeatNewPassword, setCheckHideRepeatNewPassword] = useState(true);
    
    useEffect(() => {
        setPasswordMatchError(newPassword.value !== repeatNewPassword.value);
    }, [newPassword.value, repeatNewPassword.value]);

  return (
    <Box maxW="400px">
    <form onSubmit={handleSubmit(onSubmitForm)}>
        <FormControl isRequired mb="10px">
            <FormLabel>
            Old Passowrd
            </FormLabel>
            <Input {...register("oldPassword")} type={checkHideOldPasswrod? "password" : "text"} onKeyPress={handlePasswordKeyPress}/>
        </FormControl>
            <Checkbox mb="20px" onChange={() => setCheckHideOldPasswrod(!checkHideOldPasswrod)}>Show Password</Checkbox>

        <FormControl isRequired mb="10px">
            <FormLabel>
                New Password
            </FormLabel>
            <Input {...register("newPassword")} type={checkHideNewPassword? "password" : "text"} onKeyPress={handlePasswordKeyPress}/>
        </FormControl>
            <Checkbox mb="20px" onChange={() =>setCheckHideNewPassword(!checkHideNewPassword)}>Show Password</Checkbox>
        {errors.newPassword && (<Text color="red" fontSize="sm" m="5px">{errors.newPassword.message}</Text>)}

        <FormControl isRequired>
            <FormLabel>
                Repeat New Password
            </FormLabel>
            <Input mb="10px" {...register("repeatNewPassword")} type={checkHideRepeatNewPassword? "password" : "text"} onKeyPress={handlePasswordKeyPress}/>
        </FormControl>
        <Box>
            <Checkbox mb="20px" onChange={() =>setCheckHideRepeatNewPassword(!checkHideRepeatNewPassword)}>Show Password</Checkbox>
        </Box>
        {errors.repeatNewPassword && (<Text color="red" fontSize="sm" m="5px">{errors.repeatNewPassword.message}</Text>)}

        {passwordMatchError && (<Text color="red" fontSize="sm" m="5px">New password and Repeat new password do not match</Text>)}
        <Button mt="10px" isDisabled={!isValid} type="submit" colorScheme='purple'>Submit</Button>
    </form>
    <Text color="blue" fontSize="sm" mt="15px">{passwordMustContain}</Text>
    </Box>
  )
}

export default ChangePasswordForm