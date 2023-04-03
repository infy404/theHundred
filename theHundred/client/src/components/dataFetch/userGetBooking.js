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
    Heading,
    Text,
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Highlight,
    useDisclosure,
    Divider,
    Stack,
    Container,
    transition,
  } from "@chakra-ui/react";
  import Booking from "../../containers/user/booking";
  import axios from "axios";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { DateTime } from "luxon";
  import { useDispatch } from "react-redux";
  import { assignToast } from "../../redux/reducers/notifySlice";
  import { onEditing, afterEditing } from "../../redux/reducers/bookingSlice";
  import SideNavBar from "../../components/navBar/sideNavBar";

const UserGetBooking = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [bookingData, setBookingData] = useState([]);
    const dispatch = useDispatch()
    const { userID } = useSelector((state) => state.user);
  
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/booking/${userID}`);
      setBookingData(res.data.data);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
  
    const editBooking = (item) => {
      dispatch(onEditing(item._id))
      onOpen()
    }
  
  
    const cancelBooking = async (bookingDetail) => {
      const response = await axios.delete("http://localhost:5000/booking", {data: bookingDetail})
      dispatch(assignToast(response.data))
      fetchData()
    }
  
    return (
      <Container maxW="90%" marginTop={10}>
        <Button onClick={onOpen}> Book a Time </Button>
        <Box>
          <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader> Booking </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Booking onClose={onClose} fetchData={fetchData}/>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
  
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          padding={10}
        >
          {bookingData.map((item, index) => {
            const luxonDate = DateTime.fromISO(item.bookingDate, { zone: "utc" });
            const month = luxonDate.setLocale("en-US").toFormat("LLLL");
            const dayOfWeek = luxonDate.setLocale("en-US").toFormat("cccc");
            const dayOfMonth = luxonDate.setLocale("en-US").toFormat("dd");
            return (
              <Card color={"black.100"} backgroundColor={"facebook.100"} size={"md"} variant={"elevated"} border={"0.5px"} boxShadow="md">
                <CardHeader>
                  <Heading size="md" > Booking Number <Text color={item.bookingNumber}>{item.bookingNumber}</Text></Heading>
                </CardHeader>
                <Divider/>
                <CardBody>
                  <Text>
                    You are booked for
                    <Text
                      bgGradient="linear(to-l, #7928CA, #FF0080)"
                      bgClip="text"
                      fontSize="xl"
                      fontWeight="extrabold"
                      _hover={{
                        bgGradient: 'linear(to-r, blue.500, yellow.500)',
                        transitionDuration: '2s'
                      }}
                    >
                      {dayOfWeek}
                    </Text>{" "}
                    {month} {dayOfMonth}
                  </Text>
                </CardBody>
                <Divider colorScheme={"teal"}/>
                <CardFooter flexDirection={"row"} justify="space-between">
                    <Button onClick={()=> editBooking(item)}>
                      Edit
                    </Button>
                    
                    <Button 
                    colorScheme={"red"} 
                    _hover={{
                      bgGradient: 'linear(to-t, blue.500, black.500)',
                    }} 
                    onClick={() => cancelBooking(item)}> 
                    Cancel Booking </Button>
                </CardFooter>
              </Card>
            );
          })}
        </SimpleGrid>
      </Container>
    );

}

export default UserGetBooking