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
} from "@chakra-ui/react";




import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import axios from "axios";
import { assignToast } from "../../redux/reducers/notifySlice"

const DynamicForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const threeDaysFromNow = DateTime.now()
    .plus({ days: 3 })
    .toFormat("yyyy-MM-dd");
  const currentDate = DateTime.now().toFormat("yyyy-MM-dd");

  const DetermineFieldType = ({ item }) => {
    if (item.type === "text" || item.type === "password" || item.type === "email" || item.type === "number") {
      return (
        <FormControl>
          <FormLabel htmlFor={item.label}>{item.placeholder}</FormLabel>
          <Field
            as={Input}
            id={item.label}
            name={item.label}
            type={item.type}
            variant="filled"
          />
        </FormControl>
      );
    } else if (item.type === "date") {
      return (
        <FormControl>
          <FormLabel htmlFor={item.label}> {item.placeholder} </FormLabel>
          <Badge colorScheme='blue' fontSize="8"> Day Booking only </Badge>
          <Input
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
    } else if (item.type === "dropdown") {
      return (
        <FormControl>
          <FormLabel htmlFor={item.label}> </FormLabel>
          <Select></Select>
        </FormControl>
      );
    }
  };
  const onSubmitTrigger = async (values) => {
    const res = await axios.post("http://localhost:5000" + props.apiEndPoint, {...values})
    dispatch(assignToast(res.data))
    props?.onClose()

    console.log(res)

  };

  return (
    <Flex bg="white" align="center" justify="center" h="auto">
      <Box bg="white" p={7} rounded="md" width="auto">
        <Formik
          initialValues={props.initialValues}
          onSubmit={(values) => onSubmitTrigger(values)}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                {props.formFields.map((item, index) => {
                  return <DetermineFieldType item={item} />;
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
