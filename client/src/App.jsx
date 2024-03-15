import { useEffect } from 'react';
import TodoContainer from './components/todoContainer/todoContainer/TodoContainer';
import todoClient from './services/todoClient';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useTodoStore from './zustand/todo/store';
import Loader from './components/loader/Loader';

const App = () => {
  const { setTodosOnStartOfApp, todos } = useTodoStore();
  const user = useAuthUser();
  useEffect(() =>{
    const fetchData = async () => {
      try {
        const todos = await todoClient.getAllTodoOfUser(user.userId);
        setTodosOnStartOfApp(todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }
    fetchData();
  },[])

  if(todos.length === 0) {
    return <Loader/>
  }
  return (<>
    <TodoContainer/>
  </>
  )
}

export default App
