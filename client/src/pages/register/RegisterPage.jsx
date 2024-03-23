import React, { useState } from "react";
import userClient from "../../services/userClient";
import {
  Flex,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Input,
  Button,
  Text,
  useToast
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./registerRules";
import { passwordMustContain } from "../../services/schemasRules"
import { handlePasswordKeyPress } from "../../services/general";
import Loader from "../../components/loader/Loader";
import LoaderAfterAction from "../../components/loader/LoaderAfterAction";

const RegisterPage = () => {
  const signIn = useSignIn();
  const toast = useToast()
  const navigate = useNavigate();
  const [showLoaderForRegister, setShowLoaderForRegister] = useState(false);
  const {register, handleSubmit, formState:{errors, isValid}} = useForm({resolver:zodResolver(schema)});

  const onClickSignUp = async (data) => {
    try{
      setShowLoaderForRegister(true);
      const { email, password, fullName } = data
      const userToRegister = {
        "email": email,
        "password": password,
        "fullName": fullName,
      };
      const result = await userClient.register(userToRegister);
        signIn({
          auth:{
            token:result.token,
            type:"Bearer",
          },
          userState:{email:result.returnedData.email, fullName:result.returnedData.fullName,
            userId:result.returnedData._id}
          })
          toast({
            title: 'Signed Up.',
            description: "Successfully Signed Up.",
            duration: 4000,
            isClosable: true,
            position: 'top',
            status: 'success',
          })
          navigate("/")
      }catch(error){
        toast({
          title: 'Signed Up Failed.',
          description: error.message,
          duration: 4000,
          isClosable: true,
          position: 'top',
          status: 'error',
        })
        //TODO: something
      }finally{
        setShowLoaderForRegister(false);
      }
  };

  return (
    <>
    {showLoaderForRegister? <LoaderAfterAction/> :
      <Flex justify="center" mt="50px">
        <Card borderTop="8px" borderColor="blue" w="400px" p="20px">
          <CardHeader><Heading>Register</Heading></CardHeader>
          <form onSubmit={handleSubmit(onClickSignUp)}>
          <CardBody>
            <Input
            {...register("email")}
            placeholder="email"
            mb="10px"
            />
            {errors.email && (<Text color="red" fontSize="sm" m="5px">{errors.email.message}</Text>)}
            <Input
              {...register("password")}
              placeholder="password"
              mb="10px"
              type="password"
              onKeyPress={handlePasswordKeyPress}
              />
              {errors.password && (<Text color="red" fontSize="sm" m="5px">{errors.password.message}</Text>)}
            <Input
              {...register("fullName")}
              placeholder="Full Name"
              />
              {errors.fullName && (<Text color="red" fontSize="sm" m="5px">{errors.fullName.message}</Text>)}
          </CardBody>
          <CardFooter>
            <Button isDisabled={!isValid} type ="submit" colorScheme="blue" mr="20px">
              Sign Up
            </Button>
            <Link to="/login">
            <Button colorScheme="blue">Go Back To Login Page</Button>
            </Link>
          </CardFooter>
              </form>
        <Text color="blue" fontSize="sm" m="5px">{passwordMustContain}</Text>
        </Card>
      </Flex>
  }
    </>
  );
};

export default RegisterPage;
