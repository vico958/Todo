import { useMutation } from "@tanstack/react-query";

const useDeleteTodo = () => {
    const mutateFunction = ({url, _id, token}) =>fetch(url,
            {
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: _id,
                }),
            })

      return useMutation({
      mutationFn: mutateFunction
    })
}
export default useDeleteTodo;