import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from "@chakra-ui/react";

const GenericModal = ({onClickYesButton, modalMessage, setModalNotToShow}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() =>{
    onOpen()
  }, [])
  return (
    <>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalBody>
          {modalMessage}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => {
              onClose()
              onClickYesButton()
              setModalNotToShow(false)}}>
              Yes
            </Button>
            <Button onClick={() => {
              onClose()
              setModalNotToShow(false)}}
            variant="ghost">No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GenericModal;
