const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Users = require("./models/userModel");
const connectDb = require("./db/connectDb");
const { connect } = require("mongoose");
const port = 5000;
const pwdHash = require("./utils/pwdHash");
const getLoginFields = require("./utils/getLoginField")

 
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
      req.body["userRole"] = "user" //*Appending user as an userRole to every request. Since only users can register. 
      const data = await Users.create(req.body);
      if (data) {
        res.json({
          message: "Registration Successful!",
          status: 200,
        });
      } else {
        res.json({
          message: "Registration Failed",
          status: 400,
          description: "Registration cannot be completed at the moment!"
        });
      }
    });
  } catch (err) {
      res.json({
        message: err.message,
        status: 400,
        description: "Registration cannot be completed at the moment!"
      })
  }
});

app.post('/login', async (req, res)=> {

  const loginKey = getLoginFields(req.body.loginKey)
  console.log(loginKey)
  const findUser = await Users.findOne({[loginKey]: req.body.loginKey})
  console.log(findUser)
  if(findUser){
    console.log(req.body.password, findUser.password)
    const check = await pwdHash.loginCheck(req.body.password, findUser.password)
    console.log(check)
    if(check){
      res.json({
        message: "Login Success!!",
        status: 200,
        id: findUser._id
      })
    } else {
      res.json({
        message: "Invalid Credentials",
        status: 401,
        description: "Input credentials do not match"
      })
    }
    
  }
  else{
    res.json({
      message: "Invalid Credentials",
      status: 401,
      description: "Input credentials do not match"
      })
  }
  

} )


app.post("/booking", async (req, res) => {
  

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
