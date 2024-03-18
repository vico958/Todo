import { Flex, Button, Card, CardHeader, Heading, Input, CardBody, CardFooter, useToast } from '@chakra-ui/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userClient from "../services/userClient";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const onClickLogin = async (data) =>{
    try{
      const {email, password} = data
      const userInfo = {
        email:email,
        password:password
      }
      const result = await userClient.login(userInfo);
      const {token , user} = result
      signIn({
        auth:{
          token:token,
          type:"Bearer",
        },
        userState:{email:user.email, fullName:user.fullName, userId:user._id, token:token}
      })
      toast({
        title: "Login",
        description: "Successfully Logined",
        duration: 1500,
        position: "top",
        status: "success",
      });
      setTimeout(function() {
        navigate("/")
        }, 1600);
    }catch(error){
      toast({
        title: "Login",
        description: `Failed to Login because ${error}`,
        duration: 1500,
        position: "top",
        status: "error",
      });
      setTimeout(function() {
        navigate("/login")
        }, 1600);
    }
  }
  return (
    <Flex justify="center" mt="50px">
    <Card borderTop="8px" borderColor="blue" w="400px" p="20px">
      <CardHeader><Heading>Login</Heading></CardHeader>
      <form onSubmit={handleSubmit(onClickLogin)}>
      <CardBody>
        <Input {...register("email")} placeholder='email' mb="10px"/>
        <Input {...register("password")} placeholder='password' mb="10px" type="password"/>
      </CardBody>

      <CardFooter>
        <Button type="submit" colorScheme='blue' mr="13px">Login</Button>
        <Link to="/register">
        <Button colorScheme='blue'>Sign Up</Button>
        </Link>
      </CardFooter>
      </form>
    </Card>
    </Flex>
  )
}

export default LoginPage
