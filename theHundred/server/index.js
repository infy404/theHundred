const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Users = require("./models/userModel");
const connectDb = require("./db/connectDb");
const port = 5000;
const pwdHash = require("./utils/pwdHash");
const getLoginFields = require("./utils/getLoginField");
const Bookings = require("./models/bookingModel");
const Testimonials = require("./models/testimonialModel");

connectDb();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  try {
    pwdHash.pwdHasher(req.body.password).then(async function (hash) {
      req.body.password = hash;
      req.body["userRole"] = "user"; //*Appending user as an userRole to every request. Since only users can register.
      const data = await Users.create(req.body);
      if (data) {
        res.json({
          message: "Registration Successful!",
          status: 200,
          description: "User has been successfully registered!",
        });
      } else {
        res.json({
          message: "Registration Failed",
          status: 401,
          description: "Registration cannot be completed at the moment!",
        });
      }
    });
  } catch (err) {
    res.json({
      message: err.message,
      status: 500,
      description: "Registration cannot be completed at the moment!",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const loginKey = getLoginFields(req.body.loginKey);
    const findUser = await Users.findOne({ [loginKey]: req.body.loginKey });
    if (findUser) {
      const check = await pwdHash.loginCheck(
        req.body.password,
        findUser.password
      );
      if (check) {
        res.json({
          message: "Login Success!!",
          status: 200,
          description: "User Succesfully logged in!",
          userID: findUser._id,
          userRole: findUser.userRole,
        });
      } else {
        res.json({
          message: "Invalid Credentials",
          status: 401,
          description: "Input credentials do not match",
        });
      }
    } else {
      res.json({
        message: "Invalid Credentials",
        status: 401,
        description: "Input credentials do not match",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
      status: 500,
      description: "Something went wrong",
    });
  }
});

app.get("/booking", async (req, res) => {
  try {
    const allBookingData = await Bookings.find()
      .populate("userID", [
        "firstName",
        "lastName",
        "userEmail",
        "phoneNumber",
        "bookingDate",
      ])
      .sort({ bookingDate: "asc" });
    console.log(allBookingData);
    if (allBookingData > 0) {
      res.json({
        message: "Fetched Booking Data",
        status: 200,
        data: allBookingData,
      });
    } else {
      res.json({
        message: "No booking data available",
        status: 200,
        data: allBookingData,
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
      status: 500,
      description: "Refer to the error above!",
    });
  }
});

app.get("/booking/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const bookingDataOfUser = await Bookings.find({ userID: userID });
    if (bookingDataOfUser) {
      res.json({
        message: "Fetched Users",
        status: 200,
        data: bookingDataOfUser,
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
      status: 500,
      description: "There seems to be a problem!",
    });
  }
});

app.post("/booking", async (req, res) => {
  try {
    const checkEntry = await Bookings.exists({
      bookingDate: req.body.bookingDate,
      userID: req.body.userID,
    });
    if (checkEntry) {
      res.json({
        message: "Booking Exists",
        description: "You already have a booking for this date",
        status: 400,
      });
    } else {
      const data = await Bookings.create(req.body);
      if (data) {
        res.json({
          message: "Booking Successfull",
          description: "Your booking has been confirmed!",
          status: 200,
        });
      }
    }
  } catch (err) {
    res.json({
      message: err.message,
      status: 500,
      description: "Refer to the error above",
    });
  }
});

app.put("/booking", async (req, res) => {
  console.log(req.body);
  try {
    const checkBookings = await Bookings.exists({
      userID: req.body.userID,
      bookingDate: req.body.bookingDate,
    });
    if (checkBookings) {
      res.json({
        message: "Booking Exists",
        description: "You already have a booking for this date",
        status: 400,
      });
    } else {
      await Bookings.findByIdAndUpdate(req.body.currentId, {
        bookingDate: req.body.bookingDate,
      });
      res.json({
        message: "Booking Changed!",
        description: "Your booking has been updated!",
        status: 200,
      });
    }
  } catch (err) {}
});

app.delete("/booking/", async (req, res) => {
  try {
    const deleteBooking = await Bookings.deleteOne({
      bookingNumber: req.body.bookingNumber,
    });
    res.json({
      message: "Booking Cancelled",
      status: 200,
      description: `Your booking for ${req.body.bookingNumber} has been canceled`,
    });
  } catch (err) {
    res.json({
      message: "Error Cancelling your Booking",
      status: 500,
      description: "There seems to be a problem!",
    });
  }
});

app.post("/testimonial", async (req, res) => {
  console.log(req.body);
  try {
    const insertTestimonial = await Testimonials.create(req.body);
    res.json({
      message: "Testimonial Added",
      status: 200,
      description: "Testimonial has been added",
    });
  } catch (err) {
    res.json({
      message: "There seems to be problem",
      status: 500,
      description: err.message,
    });
  }
});

app.get("/testimonial", async (req, res) => {
  const testimonialData = await Testimonials.find();
  try {
    if (testimonialData.length > 0) {
      res.json({
        message: "Fetched Testimonial Data",
        status: 200,
        data: testimonialData,
      });
    } else {
      res.json({
        message: "No Testimonial data available",
        status: 200,
        data: testimonialData,
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
      status: 500,
      description: "Refer to the error above!",
    });
  }
});

// app.get("/bookingChart", async (req, res) => {
//   const resData = await Bookings.countDocuments(Bookings.bookingDate)
//   res.json({
//     data: resData
//   })
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
