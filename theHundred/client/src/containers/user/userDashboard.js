import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import Booking from "./booking";

const UserDashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}> Book a Time </Button>
      <Box>
        <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader> </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Booking />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default UserDashboard;
