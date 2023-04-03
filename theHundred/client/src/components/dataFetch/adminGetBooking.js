import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import { DateTime } from "luxon";

const AdminGetBooking = () => {
  useEffect(() => {
    fetchData()
  }, [])
  const [bookingData, setBookingData] = useState();
  console.log("Hello")
  const fetchData = () => {
    const res = axios.get("http://localhost:5000/booking").then(res => setBookingData(res.data.data));
  }
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="facebook">
        <TableCaption> All Bookings Till Date </TableCaption>
        <Thead>
          <Tr>
            <Th> Booking Code </Th>
            <Th> Full Name </Th>
            <Th> Email </Th>
            <Th> Phone Number </Th>
            <Th> Booking Date </Th>
          </Tr>
        </Thead>
        <Tbody>
          {bookingData?.map((item) => {
            const luxonDate = DateTime.fromISO(item.bookingDate, { zone: "utc" });
            const month = luxonDate.setLocale("en-US").toFormat("LLLL");
            const dayOfWeek = luxonDate.setLocale("en-US").toFormat("cccc");
            const dayOfMonth = luxonDate.setLocale("en-US").toFormat("dd");
            return (
              <Tr>
                <Td> {item.bookingNumber} </Td>
                <Td> {`${item.userID.firstName} ${item.userID.lastName}`}</Td>
                <Td> {item.userID.userEmail}</Td>
                <Td> {item.userID.phoneNumber}</Td>
                <Td> {`${dayOfWeek}, ${month} ${dayOfMonth} `}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default AdminGetBooking;
