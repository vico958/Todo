import { useMutation } from "@tanstack/react-query";

const useDeleteTodo = () => {
    const mutateFunction = ({url, _id}) =>fetch(url,
            {
                method: "DELETE",
                headers: {
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