import TodoItem from "../todoItem/TodoItem";
import { SimpleGrid } from '@chakra-ui/react'
import useTodoStore from "../../../zustand/todo/store";
const TodoContainer = () => {
    const todos  = useTodoStore((state) => state.todos);
    todos.sort((a,b) => {
        if (a.isPriority === b.isPriority) {
          return 0;
        }
        return a.isPriority ? -1 : 1;
      })
    return(
        <SimpleGrid spacing={10} minChildWidth="200px" >
            {todos?.map((todo) => <TodoItem key={todo._id} todo={todo}/>)}
        </SimpleGrid>
    )
}

export default TodoContainer;