import { useQuery } from "@tanstack/react-query";

const useGetTodos = (url, token) =>{
    const getAllTodosOfUser = async () =>
        fetch(url, {
          method:"GET",
          headers:{
            "authorization": `Bearer ${token}`
          }
        })
      .then((res) => res.json())
      .catch(() => {
        throw new Error("failed to fetch data")
      })
      
    return useQuery({
        queryKey:["todos", token],
        queryFn:getAllTodosOfUser
    })
}

export default useGetTodos;