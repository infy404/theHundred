import axios from "axios";
import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SideNavBar from "../../components/navBar/sideNavBar";

const AdminDashboard = () => {
    const [bookingData, setBookingData] = useState([])

    const fetch = async() =>{
        const data = await axios.get("htttp://localhost:5000/booking")
        setBookingData(data)
    }
  return (
    <SideNavBar />
  );
};

export default AdminDashboard;
