import { useEffect, useState } from 'react';
import TodoContainer from './components/todoContainer/todoContainer/TodoContainer';
import todoClient from './services/todoClient';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useTodoStore from './zustand/todo/store';
import { Flex, Text } from '@chakra-ui/react';
import Loader from './components/loader/Loader';
import LoaderAfterAction from "./components/loader/LoaderAfterAction";
const App = () => {
  const { todos, setTodosOnStartOfApp } = useTodoStore();
  const user = useAuthUser();
  const [showLoaderAfterChange, setShowLoaderAfterChange] = useState(false);
  useEffect(() =>{
    const gettingData = async() => {
      const data = await todoClient.getAllTodoOfUser(user.token);
      setTodosOnStartOfApp(data)
    }
    try{
      setShowLoaderAfterChange(true);
      gettingData();
    }catch(error){
      console.log(error.message);
    }finally{
      setShowLoaderAfterChange(false);
    }
  },[todos])

  if(todos === null){
    return <Loader/>
  }

  if(todos.length === 0){
    return(
      <Flex justify="center" mt="50px">
        <Text color="purple.600">You dont have any Task</Text>
      </Flex>
    )
  }

  return (<>
  {showLoaderAfterChange? <LoaderAfterAction/> :
    <TodoContainer/>
  }
  </>
  )
}

export default App
