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
import Booking from "./booking";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useDispatch } from "react-redux";
import { assignToast } from "../../redux/reducers/notifySlice";
import { onEditing, afterEditing } from "../../redux/reducers/bookingSlice";
import SideNavBar from "../../components/navBar/sideNavBar";

const UserDashboard = () => {
 return (
  <SideNavBar />
 )
};

export default UserDashboard;
