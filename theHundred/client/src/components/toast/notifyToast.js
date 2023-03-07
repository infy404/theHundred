import { useToast } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { clearToast } from "../../redux/reducers/notifySlice"

const NotifyToast = () => {

    const {status, message, description, display} = useSelector(state => state.notify)
    const statusCheck = (status) => {
      return status === 200 ? 'success' : 'warning' 
    }
    const toast = useToast()

    const dispatch = useDispatch()

    useEffect(()=>{
      if(display){
        setTimeout(() => {
          dispatch(clearToast())
        }, 3000);
      }
    }, [display])



    return(
        <>
        { display ?         
        toast({
          title: message,
          description: description,
          status: statusCheck(status),
          duration: 3000,
          isClosable: true,
        }): <> </>}

        </>
    )

}


export default NotifyToast