import { useEffect } from 'react';
import TodoContainer from './components/todoContainer/todoContainer/TodoContainer';
import todoClient from './services/todoClient';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useTodoStore from './zustand/todo/store';
import Loader from './components/loader/Loader';
import useGetTodos from './hooks/todos/useGetTodos';
import Error from './components/error/Error';
const App = () => {
  const { setTodosOnStartOfApp } = useTodoStore();
  const user = useAuthUser();
  const url = todoClient.getAllTodoOfUserUrl(user.userId);
  const {data, error , isLoading} = useGetTodos(url, user.token);

  useEffect(() =>{
    if(data !== undefined) {
      setTodosOnStartOfApp(data);
    }
  },[data])

  if(isLoading) {
    return <Loader/>
  }

  if(error){
    return <Error message={error.message}/>
  }

  return (<>
    <TodoContainer/>
  </>
  )
}

export default App
