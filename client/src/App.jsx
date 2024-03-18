import { useEffect } from 'react';
import TodoContainer from './components/todoContainer/todoContainer/TodoContainer';
import todoClient from './services/todoClient';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useTodoStore from './zustand/todo/store';
import { Flex, Text } from '@chakra-ui/react';

const App = () => {
  const { todos, setTodosOnStartOfApp } = useTodoStore();
  const user = useAuthUser();

  useEffect(() =>{
    const gettingData = async() => {
      const data = await todoClient.getAllTodoOfUser(user.token);
      setTodosOnStartOfApp(data)
    }

    gettingData();
  },[])

  if(todos?.length === 0){
    return(
      <Flex justify="center" mt="50px">
        <Text color="purple.600">You dont have any Task</Text>
      </Flex>
    )
  }
  return (<>
    <TodoContainer/>
  </>
  )
}

export default App
