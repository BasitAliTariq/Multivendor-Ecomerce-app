const express = require("express");
const User = require("../model/user");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { cloudinary, getPublicIdFromUrl } = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middleware/auth");
const user = require("../model/user");
const router = express.Router();

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  const userMail = await User.findOne({ email });
  if (userMail) {
    if (req.file && req.file.filename) {
      try {
        await cloudinary.uploader.destroy(req.file.filename);
      } catch (error) {
        console.log("Cloudinary cleanup failed:", error.message || error);
      }
    }
    return next(new ErrorHandler("User already exist", 400));
  }

  const user = {
    name: name,
    email: email,
    password: password,
    avatar: req.file.path,
  };
  const activationToken = createActivationToken(user);
  const activationUrl = `http://localhost:5173/activation/${activationToken}`;
  try {
    await sendMail({
      email: user.email,
      subject: "Activate your account",
      message: `Hell ${user.name}. Please click on yhe link to activaye your account ${activationUrl} `,
    });
    res.status(201).json({
      success: true,
      message: `Please check you email:- ${user.email}  to activate your account:`,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET,
      );
      if (!newUser) {
        return next(new ErrorHandler("Invalid token ", 400));
      }
      const { name, email, password, avatar } = newUser;
      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("Uaser already exists", 400));
      }
      const savedUser = await User.create({
        name,
        email,
        avatar,
        password,
      });
      sendToken(savedUser, 201, res);
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  }),
);
// login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(
          new ErrorHandler("Please provide the all required fields :", 400),
        );
      }
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User does not exist :", 400));
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Pleas provide the correct information", 400),
        );
      }
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);

// load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("User does not exist :", 400));
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);

// logout user
router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "Log Out Successfull",
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  }),
);

// update user info
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User does not exist", 400));
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct Information", 400),
        );
      }
      if (name) user.name = name;
      if (email) user.email = email;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);

// update user avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existUser = await User.findById(req.user.id);
      if (!existUser) {
        return next(new ErrorHandler("User not found!", 400));
      }

      const publicId = getPublicIdFromUrl(existUser.avatar);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.log("Cloudinary cleanup failed:", error.message || error);
        }
      }

      const user = await User.findByIdAndUpdate(req.user.id, {
        avatar: req.file.path,
      });
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);

// update user adresses

router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType,
      );
      if (sameTypeAddress) {
        return next(
          new ErrorHandler(
            `${req.body.addressType} address already exist`,
            400,
          ),
        );
      }
      const existAddress = user.addresses.find(
        (address) => address._id === req.body._id,
      );
      if (existAddress) {
        Object.assign(existAddress, req.body);
      } else {
        // add the new address to the array
        user.addresses.push(req.body);
      }
      await user.save();
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);

//delete user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("User does not exists", 400));
      }
      const addressId = req.params.id;
      await User.updateOne(
        { _id: req.user.id },
        { $pull: { addresses: { _id: addressId } } },
      );
      const updatedUser = await User.findById(req.user.id);
      res.status(200).json({
        success: true,
        user: updatedUser,
      });
    } catch (e) {
      return next(new ErrorHandler(e.message, 500));
    }
  }),
);

//change password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;
      const user = await User.findById(req.user.id).select("+password");
      if (!user) {
        return next(new ErrorHandler("User does not exist", 400));
      }

      const isOldPasswordValid = await user.comparePassword(oldPassword);
      if (!isOldPasswordValid) {
        return next(new ErrorHandler("Invalid old password", 400));
      }

      if (newPassword !== confirmPassword) {
        return next(
          new ErrorHandler("new and confirm password must be same", 400),
        );
      }

      user.password = newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (e) {
      return next(new ErrorHandler(e.message, 500));
    }
  }),
);

//get user information with user id
router.get(
  "/user-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(e.message, 500));
    }
  }),
);

module.exports = router;
