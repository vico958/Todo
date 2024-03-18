import { create } from "zustand";

const useTodoStore = create((set) => ({
    todos:null,
    createTodo : (newTodo) => set((state) => ({todos:[...state.todos, newTodo]})),
    removeTodo : (id) => set((state) => ({todos:[...state.todos.filter((todo) => todo._id !== id)]})),
    setTodosOnStartOfApp: (todosArr) => {
        set({todos:todosArr});
    },
    editTodoPriority: (id) => set((state) => ({todos:[...state.todos.filter((todo) => {
        if(todo._id === id) todo.isPriority = !todo.isPriority
        return todo
    })]})),
    setRemoveAllTodosOnLogOut : () => set({todos:null})
}))

export default useTodoStore;