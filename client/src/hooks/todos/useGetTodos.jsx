import { useQuery } from "@tanstack/react-query";

const useGetTodos = (userId, url) =>{

    const getAllTodosOfUser = async () =>
        fetch(url)
      .then((res) => res.json())
      .catch(() => {
        throw new Error("failed to fetch data")
      })
      
    return useQuery({
        queryKey:["todos", userId],
        queryFn:getAllTodosOfUser
    })
}

export default useGetTodos;