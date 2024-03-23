import { Card, CardHeader, Box, Text, Heading, CardBody, CardFooter, Divider, Tooltip, useToast  } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import todoClient from "../../../services/todoClient";
import useTodoStore from "../../../zustand/todo/store";
import GenericModal from "../../genericModal/GenericModal";
import { useRef, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import LoaderAfterAction from "../../loader/LoaderAfterAction";

const TodoItem = ({todo}) => {
    const user = useAuthUser();
    const {title, description, _id} = todo
    const {removeTodo, editTodoPriority}  = useTodoStore();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("")
    const onClickAnswerModal = useRef(null)
    const toast = useToast();
    const [showLoaderAfterDeleteOrEditTodo, setShowLoaderAfterDeleteOrEditTodo] = useState(false);

    const handleDeleteTaskAfterAcceptDelete = async () =>{
        const token = user.token;
        try{
            setShowLoaderAfterDeleteOrEditTodo(true);
            await todoClient.deleteTask(_id, token)
            removeTodo(_id)
            toastFunctionForComponent('Removed todo.', "Successfully removed todo", "success");
        }catch(error){
            toastFunctionForComponent('Removed todo.', "Failed removed todo", "error");
        }finally{
            setShowLoaderAfterDeleteOrEditTodo(false);
        }
    }

    const handleEditTodoPriorityAfterAcceptEdit = async () => {
        const token = user.token;
        try{
            setShowLoaderAfterDeleteOrEditTodo(true);
            await todoClient.editTodoPriority(_id, token);
            editTodoPriority(_id)
            toastFunctionForComponent('Edited todo.', "Successfully Edited todo", "success");
        }catch(error){
            toastFunctionForComponent('Edited todo.', "Failed Edited todo", "error");
        }finally{
            setShowLoaderAfterDeleteOrEditTodo(false);
        }
    }

    const handleDeleteTask = () => {
        setShowModal(true);
        setModalMessage(`are you sure you want to delete ${title} task?`)
        onClickAnswerModal.current = handleDeleteTaskAfterAcceptDelete;
    }
    
    const handleEditTodoPriority = () =>{
        setShowModal(true);
        setModalMessage(`are you sure you want to edit this priority ${title} task?`)
        onClickAnswerModal.current = handleEditTodoPriorityAfterAcceptEdit;
    }

    const toastFunctionForComponent = (title, description, status) => {
        toast({
            title: title,
            description: description,
            duration: 1500,
            isClosable: true,
            position: 'top',
            status: status,
          })
    }

    return(
        <>
        {showLoaderAfterDeleteOrEditTodo? <LoaderAfterAction/> :
        <>
        {showModal && <GenericModal onClickYesButton={onClickAnswerModal.current} modalMessage={modalMessage} setModalNotToShow={setShowModal}/>}
        <Tooltip mb="10px" placement='top-end' hasArrow arrowSize={15} 
        isDisabled={!todo.isPriority} label="High Priority hurry up to finish!!!">
        <Card mt="40px" borderTop="8px" borderColor={todo.isPriority === true? "red" : "purple.100"} maxW="300px"
        transition="all 0.3s ease-in-out"
        _hover={{ transform: "scale(1.05)"}}>
            <CardHeader maxH="100px" overflow="auto">
                    <Box >
                        <Heading as="h3" size="sm">
                            {title}
                        </Heading>
                    </Box>
            </CardHeader>
            <CardBody color="gray.500" maxH="100px" overflow="auto">
                <Text>{description}</Text>
            </CardBody>
            <Divider/>
            <CardFooter>
                <DeleteIcon mr="20px" transition="all 0.3s ease-in-out" _hover={{bg:"gray.300", cursor: "pointer"}} onClick={handleDeleteTask}/>
                <EditIcon transition="all 0.3s ease-in-out" _hover={{bg:"gray.300", cursor: "pointer"}} onClick={handleEditTodoPriority}/>
            </CardFooter>
        </Card>
        </Tooltip>
        </>
        }
            </>
            )
}

export default TodoItem;