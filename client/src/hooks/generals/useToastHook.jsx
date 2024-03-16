import { useToast } from "@chakra-ui/react";
const toast = useToast();
const useToastHook = (title, description, status) => {
    toast({
        title: title,
        description: description,
        duration: 2000,
        isClosable: true,
        position: 'top',
        status: status,
      })
}

export default useToastHook;