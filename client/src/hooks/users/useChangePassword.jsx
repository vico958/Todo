import { useMutation } from "@tanstack/react-query";

const useChangePassword = () => {

  const mutateFunction = async ({oldPassword, newPassword, url, token}) =>{
    const user = {
        oldPassword:oldPassword,
        newPassword:newPassword
    }
    const res = await fetch(url,{
        method:"put",
        headers:{
          "authorization": `Bearer ${token}`,
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

export default useChangePassword;