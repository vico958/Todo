import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Box,
  Checkbox,
  Textarea,
  Button,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import todoClient from "../services/todoClient";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import GenericModal from "../components/genericModal/GenericModal";

const CreateTodoPage = () => {
  const user = useAuthUser();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const onClickAnswerModal = useRef(null);
  const toast = useToast();

  const onSubmitForm = async (data) => {
    let message="";
    try {
      await todoClient.createTask({ ...data, userId: user.userId });
      onClickAnswerModal.current = navigateToHomePage;
      toast({
        title: "Created task",
        description: "Successfully created task",
        duration: 1500,
        position: "top",
        status: "success",
      });
      message = "Would you like to move to home page?";
      reset();
    } catch (error) {
      toast({
        title: "Created task",
        description: "Failed to create task",
        duration: 1500,
        position: "top",
        status: "error"
      });
      onClickAnswerModal.current = onSubmitForm;
      message = `Something went worng with error code ${error.statusCode} would you like to retry to make this task?`
    }finally{
      setTimeout(function() {
        setShowModal(true);
        setModalMessage(
          message
          );
        }, 1600);
    }
  };

  const navigateToHomePage = () => {
      navigate("/");
  };
  return (
    <>
      {showModal && (
        <GenericModal
          modalMessage={modalMessage}
          onClickYesButton={onClickAnswerModal.current}
          setModalNotToShow={setShowModal}
        />
      )}
      <Box maxW="480px">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <FormControl isRequired mb="40px">
            <FormLabel>Task title</FormLabel>
            <Input {...register("title")} type="text" />
            <FormHelperText>Enter a title</FormHelperText>
          </FormControl>

          <FormControl isRequired mb="40px">
            <FormLabel>Task description</FormLabel>
            <Textarea
              {...register("description")}
              placeholder="Enter a description"
            />
          </FormControl>

          <FormControl display="flex" alignItems="center" mb="40px">
            <Checkbox {...register("isPriority")} size="lg" />
            <FormLabel mb="0" ml="10px">
              Make this a priority task
            </FormLabel>
          </FormControl>

          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </>
  );
};

export default CreateTodoPage;
