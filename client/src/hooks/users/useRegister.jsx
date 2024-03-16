import { useMutation } from "@tanstack/react-query";

const useRegister = () => {

  const mutateFunction = async ({userToRegister, url}) =>{
    const res = await fetch(url, {
    method:"POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify({
        userToRegister
    })
  })
  const jsonToReturn = await res.json();
  if(res.status !== 200){
    throw new Error(jsonToReturn);
  }
  return jsonToReturn;
}
  return useMutation({
  mutationFn: mutateFunction
})
}

export default useRegister;