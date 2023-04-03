import axios from "axios";
import { Avatar, Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TestimonialCard from "../components/testimonial/testimonialCard";

const Testimonial = () => {
  const [testimonialData, setTestimonialData] = useState([]);

  const getTestimonial = async () => {
    const fetchTestimonial = await axios.get(
      "http://localhost:5000/testimonial"
    );
    setTestimonialData(fetchTestimonial.data.data);
  };

  useEffect(() => {
    getTestimonial();
  }, []);

  return (
    <>
    {testimonialData.map((item) => {
      console.log(item)
      return(
        <TestimonialCard item={item} />
      )
    })}
    </>
  )
};

export default Testimonial;
