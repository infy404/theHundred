import DynamicForm from "../../components/forms/dynamicForm";

const Login = (props) => {
  const loginFields = [
    { label: "loginKey", type: "text", placeholder: "Phone Number or Email" },
    { label: "password", type: "password", placeholder: " Password" },
  ];

  return <DynamicForm 
          formFields={loginFields} 
          buttonName={"Login"} 
          apiEndPoint={"/login"}
          onSuccessNavigation={"/userDashboard"}
          initialValues = {{}}
          onClose= {props.onClose}
          
        />;
};

export default Login;
