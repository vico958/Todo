import { useMutation } from "@tanstack/react-query";

const useCreateTodo = () => {

  const mutateFunction = ({newTask, url, token}) =>fetch(url, {
      method:"POST",
      credentials: "same-origin",
      headers: {
        "authorization": `Bearer ${token}`,
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