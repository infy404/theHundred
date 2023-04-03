import {
  chakra,
  Flex,
  VisuallyHidden,
  HStack,
  Button,
  IconButton,
  Box,
  VStack,
  CloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useDisclosure, useColorModeValue } from "@chakra-ui/react";
import Login from "../../containers/auth/login";
import Register from "../../containers/auth/register";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loadForm, setLoadForm] = useState(null);
  const navigate = useNavigate()

  const check = (params) => {
    onOpen()
    params ==="Login" ? setLoadForm(<Login onClose={onClose}/>) : setLoadForm(<Register onClose={onClose}/>)
  }

  return (
    <Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="The 100"
              display="flex"
              alignItems="center"
            >
              {/* <Logo /> */}
              <VisuallyHidden>The 100</VisuallyHidden>
            </chakra.a>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2" onClick={()=> {navigate("/")}}>
              The 100
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{
                base: "none",
                md: "inline-flex",
              }}
            >
              <Button variant="ghost" onClick={()=> {navigate("/testimonial")}}>Testimonial</Button>
              <Button variant="ghost" onClick={()=> {navigate("/aboutUs")}}>About Us</Button>
              <Button
                variant="solid"
                bg="blue.100"
                 onClick={() => check("Login")}
              >
                Sign in
              </Button>
              <Button variant="solid" bg="blue.300"  onClick={() => check("Register")}>
                Register
              </Button>
            </HStack>
            <Button colorScheme="brand" size="sm">
              Get Started
            </Button>
            <Box
              display={{
                base: "inline-flex",
                md: "none",
              }}
            >
              <IconButton
                display={{
                  base: "flex",
                  md: "none",
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: "inherit",
                }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <Button w="full" variant="ghost">
                  Features
                </Button>
                <Button w="full" variant="ghost">
                  Pricing
                </Button>
                <Button w="full" variant="ghost">
                  Blog
                </Button>
                <Button w="full" variant="ghost">
                  Company
                </Button>
                <Button w="full" variant="ghost">
                  Sign in
                </Button>
                <Button w="full" variant="ghost">
                  Register
                </Button>
              </VStack>
            </Box>
          </HStack>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={"md"}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader> </ModalHeader>
              <ModalCloseButton />
              <ModalBody>{loadForm}</ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      </chakra.header>
    </Fragment>
  );
};

export default NavBar;
