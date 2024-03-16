import { useMutation } from "@tanstack/react-query";

const useLogin = () => {

  const mutateFunction = async ({userInfo, url}) =>{
    const res = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            userInfo
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

export default useLogin;