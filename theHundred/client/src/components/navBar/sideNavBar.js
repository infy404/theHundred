import {
  Avatar,
  Box,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift, AiOutlinePlusCircle, AiOutlinePlus, AiOutlineCalendar, AiOutlineLogout, AiOutlineLineChart } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome, MdKeyboardArrowRight, MdOutlinePreview } from "react-icons/md";
import React from "react";
import CreateTestimonial from "../../containers/admin/createTestimonial";
import { useState } from "react";
import axios from "axios";
import AdminGetBooking from "../dataFetch/adminGetBooking";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/reducers/userSlice";
import UserGetBooking from "../dataFetch/userGetBooking";
import PieChart from "../charts/pieChart";


const SideNavBar = () => {
  const sidebar = useDisclosure();
  const integrations = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.300");
  const naviagte = useNavigate()
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(logoutUser())
    naviagte("/")
  }

  const {userRole} = useSelector((state) => state.user)

  const [loadForm, setLoadForm] = useState(userRole === 'admin' ? <AdminGetBooking /> : <UserGetBooking />);

  const viewBookingsClick = () => {

    if(userRole === 'admin'){
      setLoadForm(<AdminGetBooking />)
    }
    else{
      setLoadForm(<UserGetBooking />)
    }
  }

  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{ color: "gray.400" }}
        _hover={{
          bg: "gray.100",
          _dark: { bg: "gray.900" },
          color: "gray.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{ bg: "gray.800" }}
      border
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        {/* <Logo /> */}
        <Text
          fontSize="2xl"
          ml="2"
          color="brand.500"
          _dark={{ color: "white" }}
          fontWeight="semibold"
        >
          The Hundred
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem icon={AiOutlineCalendar} onClick={() => viewBookingsClick()}>
          {" "}
          View Bookings{" "}
        </NavItem>
        {userRole === 'admin' ? 
        <> 
          <NavItem icon={MdOutlinePreview} onClick={integrations.onToggle}>
            Testimonials
            <Icon
              as={MdKeyboardArrowRight}
              ml="auto"
              transform={integrations.isOpen && "rotate(90deg)"}
            />
          </NavItem>
          <Collapse in={integrations.isOpen}>
            <NavItem onClick={()=> {}} pl="12" py="2">
              View Testimonials
            </NavItem>
            <NavItem onClick={()=> {setLoadForm(<CreateTestimonial setLoadForm={setLoadForm}/>)}} icon={AiOutlinePlus}pl="12" py="2">
              Add Testimonials
            </NavItem>
          </Collapse>
        <NavItem icon={AiOutlineLineChart} onClick={()=> {setLoadForm(<PieChart />)}}>Charts</NavItem>
        
        </> : <> </>}
        <NavItem icon={AiOutlineLogout} onClick={() => logOut()}>Logout</NavItem>
      </Flex>
    </Box>
  );
  return (
    <Box as="section" bg="gray.50" _dark={{ bg: "gray.700" }} minH="100vh">
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          flexDirection={"row-reverse"}
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="white"
          _dark={{ bg: "gray.800" }}
          borderBottomWidth="1px"
          color="inherit"
          h="14"
        >

          <Flex align="center">
            <Icon color="gray.500" as={FaBell} cursor="pointer" />
            <Avatar
              ml="4"
              size="sm"
              name="anubra266"
              src="https://avatars.githubusercontent.com/u/30869823?v=4"
              cursor="pointer"
            />
          </Flex>
        </Flex>

        <Box as="main" p="4">
          {loadForm}
          {/* <CreateTestimonial /> */}
        </Box>
      </Box>
    </Box>
  );
};
export default SideNavBar;
