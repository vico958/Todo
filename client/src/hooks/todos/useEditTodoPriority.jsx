import { useMutation } from "@tanstack/react-query";

const useEditTodoPriority = () => {
    const mutateFunction = ({url, _id}) =>fetch(url,
    {
      method: "PUT",
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
export default useEditTodoPriority;