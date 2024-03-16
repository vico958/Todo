import { useMutation } from "@tanstack/react-query";

const useChangeFullName = () => {

  const mutateFunction = async ({userId, password, fullName, url}) =>{
    const user = {
        userId:userId,
        password:password,
        fullName:fullName
    }
    const res = await fetch(url,{
        method:"put",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            user
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

export default useChangeFullName;