import React from "react";
import { Box, Flex, Icon, Image, chakra, Text } from "@chakra-ui/react";
import {DateTime} from "luxon"
import { MdEmail, MdHeadset, MdLocationOn } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";

const TestimonialCard = (props) => {
  console.log(props);
  const luxonDate = DateTime.fromISO(props.item.date, { zone: "utc" });
  const month = luxonDate.setLocale("en-US").toFormat("LLLL");
  const dayOfWeek = luxonDate.setLocale("en-US").toFormat("cccc");
  const dayOfMonth = luxonDate.setLocale("en-US").toFormat("dd");
  return (
    <Flex
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="sm"
        mx="auto"
        bg="transparent"
        _dark={{ bg: "gray.800" }}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
      >
        <Box
          alignContent="center"
          display="flex"
          justifyContent={"center"}
          bg="transparent"
        >
          <Image
            w="full"
            h={56}
            fit="cover"
            objectPosition="left"
            src={props.item.reviewerImage} //props.item.itemimage
            alt="avatar"
            borderRadius="full"
            boxSize={150}
            alignItems="center"
            justifyContent="center"
            bg="transparent"
          />
        </Box>

        <Flex alignItems="center" px={6} py={3} bg="gray.900"></Flex>

        <Box py={4} px={6} bg={"white"}>
          <chakra.h1
            fontSize="2xl"
            fontWeight="bold"
            color="gray.800"
            _dark={{ color: "white" }}
          >
            {props.item.name}
          </chakra.h1>
          <chakra.h1 p={2} fontSize="xs">
            {props.item.title} @ {props.item.company}
          </chakra.h1>

          <chakra.p py={2} color="gray.700" _dark={{ color: "gray.400" }}>
            "<Text as={"i"}>{props.item.review}</Text>"
          </chakra.p>

          <chakra.p fontSize={"x-small"}>{`${dayOfWeek}, ${month} ${dayOfMonth}`}</chakra.p>

          <Flex
            alignItems="center"
            mt={4}
            color="gray.700"
            _dark={{ color: "gray.200" }}
          >
            <Icon as={MdEmail} h={5} w={5} mr={2} />

            <chakra.h1 px={2} fontSize="sm">
              {props.item.email}
            </chakra.h1>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default TestimonialCard;
