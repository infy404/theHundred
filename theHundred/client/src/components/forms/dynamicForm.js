import { Field, Formik, useFormik } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  Badge,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { assignToast } from "../../redux/reducers/notifySlice";
import { logoutUser, loginUser } from "../../redux/reducers/userSlice";
import { afterEditing } from "../../redux/reducers/bookingSlice";
const DynamicForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const threeDaysFromNow = DateTime.now()
    .plus({ days: 3 })
    .toFormat("yyyy-MM-dd");
  const currentDate = DateTime.now().toFormat("yyyy-MM-dd");
  const { userID } = useSelector((state) => state.user);
  const { isEditing, currentId } = useSelector((state) => state.booking)
  const [imageName, setImageName] = useState(null)

  const generateRandomHexCode = () => {
    const digits = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
  
    let hexCode = "#" 
  
    while( hexCode.length < 7 ){
      hexCode += digits[ Math.round( Math.random() * digits.length ) ]
    }
  
    return hexCode 
  }

  const DetermineFieldType = ({item}, errors, touched) => {
    if (
      item.type === "text" ||
      item.type === "password" ||
      item.type === "email" ||
      item.type === "number"
    ) {
      return (
        <FormControl isInvalid={touched && !! errors}>
          <FormLabel htmlFor={item.label}>{item.placeholder}</FormLabel>
          <Field
            as={Input}
            id={item.label}
            name={item.label}
            type={item.type}
            variant="filled"
            
          />
          <FormErrorMessage>{errors}</FormErrorMessage>
        </FormControl>
      );
    } else if (item.type === "date") {
      return (
        <FormControl>
          <FormLabel htmlFor={item.label}> {item.placeholder} </FormLabel>
          <Badge colorScheme="blue" fontSize="8">
            {" "}
            Day Booking only{" "}
          </Badge>
          <Field
            as={Input}
            id={item.label}
            name={item.label}
            type="date"
            variant="filled"
            focusBorderColor="pink"
            min={currentDate}
            max={threeDaysFromNow}
          />
        </FormControl>
      );
    } else if (item.type === "textarea") {
      return (
        <FormControl>
          <FormLabel htmlFor={item.label}> {item.placeholder} </FormLabel>
          <Field
            as={Textarea}
            id={item.label}
            name={item.label}
            type={item.type}
            variant="filled"
            resize="vertical"
          ></Field>
        </FormControl>
      );
    } else if (item.type === "file") {
      return (
        <input type="file" onChange={(e) => setImageName(e.target.files[0])}/>
      );
    }
  };

  const onSubmitTrigger = async (values) => {
    
    let res;
    if(!isEditing){  
      if (props.apiEndPoint === "/booking") {
        const bookingNumber = generateRandomHexCode()
        values = { ...values, userID, bookingNumber};
      }

      res = await axios.post("http://localhost:5000" + props.apiEndPoint, {
        ...values,
      });
    }
    else{
      res = await axios.put("http://localhost:5000" + props.apiEndPoint, {...values, currentId, userID})
      dispatch(afterEditing())
    }

    dispatch(assignToast(res.data));

    if (res.data.status === 200) {
      console.log(props.apiEndPoint);
      switch (props.apiEndPoint) {
        case "/login":
          console.log("This is login");
          dispatch(
            loginUser({
              userID: res.data.userID,
              userRole: res.data.userRole,
            })
          );
          navigate("/");
          break;

        case "/booking":
          console.log("Mamma mia");
          props.fetchData();
          break;

        case "/user":
          break;

        case "/register":
          break;
        default:
          break;
      }
    }

    props?.onClose();
  };

  return (
    <Flex bg="white" align="center" justify="center" h="auto">
      <Box bg="white" p={7} rounded="md" width="auto">
        <Formik
          initialValues={props.initialValues}
          onSubmit={(values) => onSubmitTrigger(values)}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                {props.formFields.map((item, index) => {
                  return <DetermineFieldType item={item} errors={errors} touched={touched} />;
                })}
                <Button type="submit" colorScheme="facebook" width="full">
                  {props.buttonName}
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default DynamicForm;
