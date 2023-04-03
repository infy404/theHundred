import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../containers/admin/adminDashboard";
import CreateTestimonial from "../containers/admin/createTestimonial";
import LandingPage from "../containers/landingPage";
import TestFile from "../components/testimonial/testimonialCard";
import Testimonial from "../containers/testimonial";
import UserDashboard from "../containers/user/userDashboard";

import { useSelector } from "react-redux";
import AboutUsPage from "../containers/aboutUsPage";
const Routing = () => {
  const {isLoggedIn, userRole} = useSelector((state) => state.user)
  console.log(isLoggedIn, userRole)
  if(!isLoggedIn){
    return <DefaultRoutes />;
  }
  else if(isLoggedIn && userRole ==='user'){
    return <UserRoutes />
  }
  else if(isLoggedIn && userRole === 'admin'){
    return <AdminRoutes />
  }
  
};


const DefaultRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/aboutUs" element={<AboutUsPage />} />
      <Route path="/testimonial" element={<Testimonial />} />
    </Routes>
  );
};

// User route for registered and logged in users.
const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
    </Routes>
  );
};

// Admin route just for the admin.
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
    </Routes>
  );
};

export default Routing;
