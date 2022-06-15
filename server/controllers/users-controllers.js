const jwt = require("jsonwebtoken");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const sgMail =require ('@sendgrid/mail');


const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No products found" });
  }
  return res.status(200).json({ users });
};
const getById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "No User found" });
  }
  return res.status(200).json({ user });
};

const createUser = async (req, res) => {
  const { name, email, password, phone, department } = req.body;
  console.log('req.body', req.body)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    department,
  });
  if (!user) {
    return res.status(404).json({ message: "No products found" });
  }
  return res.status(200).json({ user });
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, author, description, price, available, image } = req.body;
  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      author,
      description,
      price,
      available,
      image,
    });
    user = await user.save();
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "Unable to Update by this ID" });
  }
  return res.status(201).json({ user });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id)
    });
    // res.send("Login");
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "Unable to Delete by this ID" });
  }
  return res.status(200).json({ message: "Product Successfully Deleted" });
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// user-controller.js
//replace forgot password function
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const OTP = await generateOTP();
      const msg = {
        to: email, // Change to your recipient
        from: {
          email: "techtic.adityapurohit@gmail.com",
          name: "BooksForAll"
        }, // Change to your verified sender
        subject: "Forgot Password",
        text: `Reset your password`,
        html: `<!DOCTYPE html>
        <html lang="en" class="light-style">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title></title>
          <style type="text/css">
            /* General styling */
            * {
              font-family: Helvetica, Arial, sans-serif;
            }
            body {
              -webkit-font-smoothing: antialiased;
              -webkit-text-size-adjust: none;
              width: 100% !important;
              margin: 0 !important;
              height: 100%;
              color: #f0f2f5;
            }
            a {
              color: #676767;
              text-decoration: none !important;
            }
            p {
              font-size: 17px;
              font-weight: 500;
            }
            .pull-left {
              text-align: left;
            }
            .pull-right {
              text-align: right;
            }
            .header-lg,
            .header-md,
            .header-sm {
              font-size: 32px;
              font-weight: 700;
              line-height: normal;
              padding: 35px 0 0;
              color: #4d4d4d;
            }
            .header-md {
              font-size: 24px;
            }
            .header-sm {
              padding: 5px 0;
              font-size: 18px;
              line-height: 1.3;
            }
            .content-padding {
              padding: 20px 0 30px;
            }
            .free-text {
              width: 100% !important;
              padding: 10px 60px 0px;
            }
            .block-rounded {
              border-radius: 5px;
              border: 1px solid #e5e5e5;
              vertical-align: top;
            }
            .button {
              padding: 30px 0;
            }
            .info-block {
              padding: 0 20px;
              width: 260px;
            }
            .button-width {
              width: 228px;
            }
            .btn {
              display: inline-block;
              font-weight: 400;
              text-align: center;
              vertical-align: middle;
              user-select: none;
              border: 1px solid transparent;
              padding: 0.438rem 1.125rem;
              font-size: 0.894rem;
              line-height: 1.54;
              border-radius: 0.25rem;
              transition: all 0.2s ease-in-out;
            }
            .btn-primary {
                border-color: transparent;
                background: #26B4FF;
                color: #fff;
            }
            .container {
              max-width: 450px;
            }
          </style>
        </head>
          <body>
            <div style="background: black;">
            </div>
            <center>
              <div class="container">
                  <h1 style="margin-top: 15px;text-align: center;font-size: 33px;">Reset Password</h1>
                  <p class="pull-left">Hi ${user.name}, We're confirming that...</p>
                  <p class="pull-left">You had requested to reset your email for BooksForAll</p>
                  <p class="pull-left">You need to submit OTP and Reset your password by loging in to BooksForAll.!</p>
                  <p class="pull-left">You had requested to reset your password for BooksForAll by submitting the OTP.!</p>
                  <p class="pull-left">Reset Password From WebSite :<h2> ${OTP} </h2></p>
                  <p class="pull-left">We'll always let you know when there is any activity on your BooksForAll. This helps keep your account safe.</p>
                  <p class="pull-left"><strong>- The BooksForAll</strong></p>
              </div>
            </center>
          </body>
        </html>`
      };
      await sendMail(msg)
        .then(item => {
          console.log("item", item);
        })
        .catch(err => {
          console.log("err", err);
        });
      const updateOtp = await User.updateOne({ email }, { OTP });
      if (updateOtp) {

        return res
          .status(200)
          .json({ message: "OPT sended successfully", OTP });
      } else {
        return res
          .status(404)
          .json({ message: "Having some issue!! pls try again" });
      }
    } else {
      return res.status(404).json({ message: "User not found register first" });
    }
  } catch (error) {
    return res.status(404).json({ message: "Unable to generate OTP" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { OTP, password } = req.body;
    const getUser = await User.findOne({ OTP });
    console.log('getUser', getUser)
    if (getUser) {
      if (getUser.OTP == OTP) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const updateData = await User.updateOne(
          { _id: getUser._id },
          { password: hashedPassword, OTP: null }
        );
        if (updateData) {
          return res
            .status(200)
            .json({ message: "Password changed successfully" });
        } else {
          return res
            .status(404)
            .json({ message: "Having some issue pls try again" });
        }
      }else{
        return res
        .status(404)
        .json({ message: "You have entered wrong otp pls try again"});
      }
    } else {
      return res.status(404).json({ message: "User not found register first" });
    }
  } catch (error) {
    return res.status(404).json({ message: "Unable to restet password" });
  }
};

const generateOTP = () => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

//send mail
async function sendMail(msg) {
  sgMail.setApiKey("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")
 
  sgMail
    .send(msg)
    .then((item) => {
      console.log('Email sent',item)
    })
    .catch((error) => {
      console.error(">1",error.response.body)
    })

    return sgMail
}

exports.getAllUsers = getAllUsers;
exports.getById = getById;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.loginUser = loginUser;
exports.forgotPassword = forgotPassword;
exports.changePassword = changePassword;


