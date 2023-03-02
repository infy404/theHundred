import DynamicForm from "../../components/forms/dynamicForm";

const Register = () => {
  const userDetailFields = [
    { label: "firstName", type: "text", placeholder: "First Name" },
    { label: "lastName", type: "text", placeholder: "Last Name" },
    { label: "userEmail", type: "email", placeholder: "Email Address" },
    { label: "phoneNumber", type: "number", placeholder: "Phone Number" },
    { label: "password", type: "password", placeholder: "Password" },
    {
      label: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
    }
  ];

  return (
    <>
      <DynamicForm
        formFields={userDetailFields}
        buttonName={"Register"}
        apiEndPoint={"/register"}
        onSuccessNavigation={"/"}
      />
    </>
  );
};

export default Register;
