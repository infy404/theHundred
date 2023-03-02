import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  useDisclosure,
  Text,
  Highlight,
} from "@chakra-ui/react";
import Login from "./auth/login";
import Register from "./auth/register";
import { useState } from "react";

const LandingPage = () => {
  // const [loginModalView, setLoginModalView] = useState(false);
  // const [registerModalView, setRegisterModalView] = useState(false);

  // const openLoginModal = () => {
  //   setLoginModalView(true);
  // };

  // const closeLoginModal = () => {
  //   setLoginModalView(false);
  // };

  // const openRegisterModal = () => {
  //   setRegisterModalView(true);
  // };

  // const closeRegisterModal = () => {
  //   setRegisterModalView(false);
  // };

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loadForm, setLoadForm] = useState()


  const check = (params) => {
    onOpen()
    params ==="Login" ? setLoadForm(<Login />) : setLoadForm(<Register />) 
  }

  /**
   * 
   * *Just putting in two buttons now for the supposed "NavBar"
   * !To be replaced with actual NavBar and links instead of buttons.  
   */
  return (
    <div>
      
       <Button variant={"solid"} onClick={() => check("Login")}>
          Login
        </Button>
        <Button variant={"solid"} onClick={() => check("Register")}>
          Register
        </Button>
        
        
      <Box>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={"md"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>  </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {loadForm}
            </ModalBody>
            <ModalFooter alignContent={"center"}>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={onClose}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </div>
  );
};

export default LandingPage;
