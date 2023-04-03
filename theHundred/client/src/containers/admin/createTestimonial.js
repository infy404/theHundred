import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Textarea,
  HStack,
  Spacer
} from "@chakra-ui/react";

import { DateTime } from "luxon";
import { useState } from "react";
import axios from "axios";
import { assignToast } from "../../redux/reducers/notifySlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminGetBooking from "../../components/dataFetch/adminGetBooking";

const CreateTestimonial = (props) => {

  const currentDate = DateTime.now().toFormat("yyyy-MM-dd");
  const [imageName, setImageName] = useState(null)
  const CLOUDINARY_UPLOAD_PRESET = "nqjhunmf"
  const CLOUD_NAME = "drfiwialf"
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <Flex bg="white" p={6}  w="auto">
        <Formik
          initialValues={{}}
          onSubmit={async (values, {resetForm}) => {
            console.log(values)
            const bodyFormData = new FormData()
            bodyFormData.append('file', imageName)
            bodyFormData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            try{
              const res = await axios.post(CLOUDINARY_URL, bodyFormData)
              const imageUrl = res.data.secure_url
              values = {...values, reviewerImage: imageUrl}
              debugger
              const insertTestimonial = await axios.post("http://localhost:5000/testimonial", values)
              if(insertTestimonial){
                dispatch(assignToast(insertTestimonial.data))
                props.setLoadForm(<AdminGetBooking />)
              }
            }
            catch(err){
              console.log(err.message)

            }
            resetForm({values: ''})
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} w="120%">
                <FormControl isInvalid={!!errors.name && touched.name}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    type="text"
                    variant="filled"
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel htmlFor="name">Email</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="text"
                    variant="filled"
                  />
                </FormControl>
                <Flex minWidth={"max-content"} flexDirection={"row"} justifyContent={"space-between"} spacing="40"> 
                <FormControl isInvalid={!!errors.title && touched.title}>
                  <FormLabel htmlFor="name"  ml="-10">Title</FormLabel>
                  <Field
                    as={Input}
                    id="title"
                    name="title"
                    type="text"
                    variant="filled"
                    ml="-20"
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.company && touched.company}>
                  <FormLabel htmlFor="name" ml="10">Company</FormLabel>
                  <Field
                    as={Input}
                    id="company"
                    name="company"
                    type="text"
                    variant="filled"
                    ml="10"
                  />
                </FormControl>
                </Flex>
                <FormControl isInvalid={!!errors.date && touched.date}>
                  <FormLabel htmlFor="date">Date</FormLabel>
                  <Field
                    as={Input}
                    id="date"
                    name="date"
                    type="date"
                    variant="filled"
                    min={currentDate}
                  />
                  <FormErrorMessage>{errors.date}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.review && touched.review}>
                  <FormLabel htmlFor="name">Comment</FormLabel>
                  <Field
                    as={Textarea}
                    id="review"
                    name="review"
                    type="text"
                    variant="filled"
                    resize="vertical"
                  />
                </FormControl>
               
                <FormControl>
                  <FormLabel htmlFor="name">Upload Image</FormLabel>
                  <input type="file" onChange={(e) => {setImageName(e.target.files[0])}} />
                </FormControl>
                
                <Button type="submit" colorScheme="purple" width="full">
                  Submit
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      
    </Flex>
  );
}


export default CreateTestimonial;
