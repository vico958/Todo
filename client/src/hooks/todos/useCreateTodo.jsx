import { useMutation } from "@tanstack/react-query";

const useCreateTodo = () => {

  const mutateFunction = ({newTask, url}) =>fetch(url, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        newTask
      })
    })
  return useMutation({
  mutationFn: mutateFunction
})
}

export default useCreateTodo;