import { 
  Flex, 
  Heading, 
  Text, 
  Button, 
  Spacer, 
  HStack, 
  useToast, 
  Avatar
} from "@chakra-ui/react"

import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useTodoStore from "../../zustand/todo/store";
export default function Navbar() {

  const toast = useToast()
  const signOut = useSignOut();
  const navigate = useNavigate()
  const user = useAuthUser()
  const { setRemoveAllTodosOnLogOut } = useTodoStore();

  const onClickSignOut = () => {
    signOut();
    setRemoveAllTodosOnLogOut();
    toast({
      title: 'Logged out.',
      description: "Successfully logged out",
      duration: 10000,
      isClosable: true,
      position: 'top',
      status: 'success',
    })
    navigate("/login")
  }
  return (
    <Flex as="nav" p="10px" mb="60px" alignItems="center">
      <Heading as="h1" fontSize="1.5em">Todo</Heading>
      <Spacer />

      <HStack spacing="20px"> 
        <Avatar name={user.fullName} src="/img/mario.png">
        </Avatar>
        <Text>{user.email}</Text>
        <Button 
          colorScheme="purple"
          onClick={onClickSignOut}
        >Logout</Button>
      </HStack>
    </Flex>
  )
}