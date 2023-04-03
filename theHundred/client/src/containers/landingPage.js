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
  return(
    <Text fontSize={"3xl"} justifyContent={"center"} alignContent={"center"}>
      Welcome to the 100
    </Text>
  )
  
};

export default LandingPage;
