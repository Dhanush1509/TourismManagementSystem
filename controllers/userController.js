const asyncHandler = require("express-async-handler");
const User = require("../models/User.js");
const Token = require("../models/Token.js.js");
const generateToken = require("../utils/generateToken.js");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
/**
 * @api {get} /user/:email/:token confirm Email
 * @apiName confirm Email
 * @apiGroup User
 *
 * @apiParam {String} email User's email.
 * @apiParam {String} token User's token.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Verified Successfully,Please login",
 *     }
 *
 * @apiError TokenNotFound The token of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Invalid token"
 *     }
 */
exports.confirmEmail = asyncHandler(async (req, res) => {
  const token = await Token.findOne({ token: req.params.token });
  if (!token) {
    res.status(400);
    throw new Error(
      "Your verification link may have expired. Please click on resend for verify your Email"
    );
  }
  const user = await User.findOne({
    _id: token._userId,
    email: req.params.email,
  });
  if (!user) {
    res.status(401);
    throw new Error(
      "We were unable to find a user for this verification. Please SignUp!"
    );
  } else if (user.isVerified) {
    res
      .status(200)
      .json({ message: "User has been already verified. Please Login" });
  } else {
    user.isVerified = true;
    const userSave = await user.save();
    if (userSave) {
      // res.json({
      //   _id: user._id,
      //   name: user.name,
      //   email: user.email,
      //   isAdmin: user.isAdmin,
      //   token: generateToken(user._id),
      // });
      res.status(200).json({ message: "Verified Successfully,Please login" });
    } else {
      res.status("400");
      throw new Error("Invalid token");
    }
  }
});

/**
 * @api {post} /api/resendLink Resend Confirmation Mail
 * @apiName Resend Confirmation Mail
 * @apiGroup User
 *
 * @apiSuccess {String} email Email of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "A verification email has been sent to ....",
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Technical Issue!, Please click on resend for verify your Email.",
 *     }
 */

exports.resendLink = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  // user is not found into database
  if (!user) {
    throw new Error(
      "We were unable to find a user with that email. Make sure your Email is correct!"
    );
    return;
  }
  // user has been already verified
  else if (user.isVerified) {
    return res.status(200).json({
      message: "This account has been already verified. Please log in.",
    });
  }
  // send verification link
  else {
    // generate token and save
    const token = new Token({
      _userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
    });
    const tokenSave = token.save();
    if (!tokenSave) {
      res.status(500);
      throw new Error("Error encountered!!");
    }

    // Send email (use credintials of SendGrid)

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      from: "ui19co56@iiitsurat.ac.in",
      to: user.email,
      subject: "Account Verification Link",
      text:
        "Hello " +
        user.name +
        ",\n\n" +
        "Please verify your account by clicking the link: \n" +
        process.env.URL +
        "confirmation/" +
        user.email +
        "/" +
        token.token +
        "\n\nThank You!\n",
    };
    sgMail.send(msg).then(
      () => {
        res.status(200).json({
          message: `A verification email has been sent to ${user.email}. It will be expire after one day. If you did not get verification Email click on resend token.`,
        });
      },
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
        return res.status(500).json({
          message:
            "Technical Issue!, Please click on resend for verify your Email.",
        });
      }
    );
  }
});

/**
 * @api {post} /api/users/login login User
 * @apiName loginUser
 * @apiGroup User
 *
 *
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {String} password  Password of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Login Successful",
 *       "userData": userDetails
 *     }
 */

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  } else if (!(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  } else if (!user.isVerified) {
    res.status(401);
    throw new Error("Your email is not verified, Please verify");
  } else {
    res.json({
      userData: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      },
      message: "Login Successful",
    });
  }
});

/**
 * @api {post} /api/users/register Register User
 * @apiName RegisterUser
 * @apiGroup User
 *
 *
 * @apiSuccess {String} name  Name of the User.
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {String} password  Password of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "A verification email has been sent to ....",
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Technical Issue!, Please click on resend for verify your Email.",
 *     }
 */
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(401);
    throw new Error("User already exists");
  }
  const userSave = new User({ name, email, password, isVerified: true });
  const savedUser = await userSave.save();

  res.json({
    userData: {
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,
      token: generateToken(savedUser._id),
    },
    message: "Register Successful",
  });
});

/**
 * @api {put} /api/users/register Update User
 * @apiName UpdateUser
 * @apiGroup User
 *
 *
 * @apiHeader (authentication) {String} x-auth-token JWT.
 * @apiSuccess {String} name  Name of the User.
 * @apiSuccess {String} email Email of the User.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Updated Successfully",
 *        "userData":Updated User details,
 *     }
 *
 * @apiError UserNotFound The User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found",
 *     }
 */

exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // let userByEmail = await User.findOne({email: req.body.email });
    // if (userByEmail) {
    //   res.status(401);
    //   throw new Error("User already exists");
    // }
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      message: "updated Successfully",
      userData: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @api {get} /api/users/profile get User Profile
 * @apiName getUser
 * @apiGroup User
 *
 * @apiHeader (authentication) {String} x-auth-token JWT.
 * @apiSuccess {String} name  Name of the User.
 * @apiSuccess {String} email Email of the User.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "user Details fetched successfully",
 * "userData":user Details
 *     }
 *
 * @apiError UserNotFound The User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found",
 *     }
 */
exports.getUserProfile = asyncHandler(async (req, res) => {
  const { _id, name, email, isAdmin } = req.user;
  const updateUser = await User.findById(_id);
  if (updateUser) {
    updateUser.updatedAt = new Date();
    await updateUser.save();
    res
      .json({
        userData: { _id, name, email },
        message: "User details fetched Successfully",
      })
      .status(200);
  } else {
    res.status(404);
    throw new Error("User not found");
  }

  // const { email, password } = req.body;
  // const user = await User.findOne({
  //   email,
  // });
  // if (user && (await user.matchPassword(password))) {
  //   res.json({
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     isAdmin: user.isAdmin,
  //     token: generateToken(user._id),
  //   });
  // } else {
  //   res.status(401);
  //   throw new Error("Invalid email or password");
  // }
});

//Admin

/**
 * @api {get} /api/users get Users
 * @apiName getUsers
 * @apiGroup Admin
 *
 * @apiHeader (authentication) {String} x-auth-token JWT.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "user Details fetched successfully",
 *       "userData":user Details
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Sorry there was an error Users not found",
 *     }
 */
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    return res
      .status(200)
      .json({ userData: users, message: "user Details fetched successfully" });
  } else {
    res.status(400);
    throw new Error("Sorry there was an error Users not found");
  }
});

/**
 * @api {put} /api/users/:id updateUser
 * @apiName update User
 * @apiGroup Admin
 *
 * @apiParam {String} id User's unique Id.
 *
 * @apiHeader (authentication) {String} x-auth-token JWT.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     userData:updated User details,
 *     message:"updated user successfully"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Update failed!!",
 *     }
 */
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    user.isVerified = req.body.isVerified;
  } else {
    throw new Error("User not found");
  }

  const userUpdate = await user.save();
  userUpdate.password = "Authenticated";
  if (userUpdate) {
    res
      .status(200)
      .json({ userData: userUpdate, message: "updated user successfully" });
  } else {
    res.status(400);
    throw new Error("Update failed!!");
  }
});

/**
 * @api {delete} /api/users/:id deleteUser
 * @apiName delete User
 * @apiGroup Admin
 *
 * @apiParam {String} id User's unique Id.
 *
 * @apiHeader (authentication) {String} x-auth-token JWT.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     message:"Deletion Successful"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User deletion unsuccessful",
 *     }
 */
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.isActive = false;
    user.isVerified = false;
    await user.save();
    res.status(200).json({ message: "Deletion Successful" });
  } else {
    res.status(400);
    throw new Error("User deletion unsuccessful");
  }
});

/**
 * @api {get} /api/users/:id getUser
 * @apiName get User
 * @apiGroup Admin
 *
 * @apiParam {String} id User's unique Id.
 *
 * @apiHeader (authentication) {String} x-auth-token JWT.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     message:"fetched user details successfully"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found",
 *     }
 */
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json({ user, message: "fetched user details successfully" });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});
