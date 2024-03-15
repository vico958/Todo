import { Card, CardHeader, Box, Text, Heading, CardBody, CardFooter, Divider, Tooltip  } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import todoClient from "../../../services/todoClient";
import useTodoStore from "../../../zustand/todo/store";
import GenericModal from "../../genericModal/GenericModal";
import { useRef, useState } from "react";

const TodoItem = ({todo}) => {
    const {title, description, _id} = todo
    const {removeTodo, editTodoPriority}  = useTodoStore();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("")
    const onClickAnswerModal = useRef(null)

    const handleDeleteTaskAfterAcceptDelete = async () =>{
            await todoClient.deleteTask(_id);
            removeTodo(_id)
    }

    const handleEditTodoPriorityAfterAcceptEdit = async () => {
        await todoClient.editTodoPriority(_id);
        editTodoPriority(_id)
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
    return(
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
    )
}

export default TodoItem;