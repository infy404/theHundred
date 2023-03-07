import { Routes, Route } from "react-router-dom";
import Login from "../containers/auth/login";
import Register from "../containers/auth/register";
import LandingPage from "../containers/landingPage";
import UserDashboard from "../containers/user/userDashboard";
const Routing = () => {
  return <DefaultRoutes />;
};

//Default Route for users just scrolling about.

const DefaultRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/userDashboard" element={<UserDashboard />} />
    </Routes>
  );
};

// User route for registered and logged in users.
const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={{}} />
    </Routes>
  );
};

// Admin route just for the admin.
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={{}} />
    </Routes>
  );
};

export default Routing;
