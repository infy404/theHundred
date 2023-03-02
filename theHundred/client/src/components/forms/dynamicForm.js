import { Field, Formik, useFormik } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom"

const DynamicForm = (props) => {

  const navigate = useNavigate();


  const DetermineFieldType = ({ item }) => {
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
  };
  const onSubmitTrigger = async (values) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(values),
    };

    const res = await fetch(
      "http://localhost:5000" + props.apiEndPoint,
      requestOptions
    );
    if (res.status === 200) {
      navigate(props.onSuccessNavigation)
    }
  };

  return (
    <Flex bg="white" align="center" justify="center" h="auto">
      <Box bg="white" p={7} rounded="md" width="auto">
        <Formik 
        initialValues={{}}
        onSubmit={(values) => onSubmitTrigger(values)}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                {props.formFields.map((item, index) => {
                  return <DetermineFieldType item={item} />
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
