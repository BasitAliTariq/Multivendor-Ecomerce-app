const express = require("express");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { cloudinary, getPublicIdFromUrl } = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const Shop = require("../model/shop");
const { isAuthenticated } = require("../middleware/auth");
const { isSeller } = require("../middleware/auth");
const { error } = require("console");
const sendShopToken = require("../utils/shopToken");
const router = express.Router();
const isProd = process.env.NODE_ENV === "production";
const frontendUrl =
  "https://multivendor-ecomerce-app-x299.vercel.app" || "http://localhost:5173";

// create shop
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      if (req.file && req.file.filename) {
        try {
          await cloudinary.uploader.destroy(req.file.filename);
        } catch (error) {
          console.log("Cloudinary cleanup failed:", error.message || error);
        }
      }
      return next(new ErrorHandler("Seller already exist", 400));
    }
    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: req.file.path,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(seller);
    const activationUrl = `${frontendUrl}/seller/activation/${activationToken}`;
    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your Shop",
        message: `Hello ${seller.name}. Please click on yhe link to activaye your shop ${activationUrl} `,
      });
      res.status(201).json({
        success: true,
        message: `Please check you email:- ${seller.email}  to activate your shop:`,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
});

// create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate seller
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET,
      );
      if (!newSeller) {
        return next(new ErrorHandler("Invalid token ", 400));
      }
      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newSeller;
      let seller = await Shop.findOne({ email });
      if (seller) {
        return next(new ErrorHandler("Uaser already exists", 400));
      }
      const savedSeller = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });
      sendShopToken(savedSeller, 201, res);
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  }),
);

// login shop
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(
          new ErrorHandler("Please provide the all required fields :", 400),
        );
      }
      const seller = await Shop.findOne({ email }).select("+password");
      if (!seller) {
        return next(new ErrorHandler("Seller does not exist :", 400));
      }
      const isPasswordValid = await seller.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Pleas provide the correct information", 400),
        );
      }
      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);

// load shop
router.get(
  "/getseller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller.id);
      if (!seller) {
        return next(new ErrorHandler("User does not exist :", 400));
      }
      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);

// logout from shop
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(0),
        httpOnly: true,
        sameSite: isProd ? "none" : "lax",
        secure: isProd,
        path: "/",
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

// get shop info

router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  }),
);

// update shop profile picture
router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      let existsSeller = await Shop.findById(req.seller._id);

      if (!existsSeller) {
        return next(new ErrorHandler("User does not exists", 400));
      }

      const publicId = getPublicIdFromUrl(existsSeller.avatar);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.log("Cloudinary cleanup failed:", error.message || error);
        }
      }

      // console.log(req.seller);

      const seller = await Shop.findByIdAndUpdate(
        req.seller._id,
        { avatar: req.file.path },
        { new: true },
      );

      res.status(200).json({
        success: true,
        seller: seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);

// update seller info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { shopName, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Shop.findById(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }

      shop.name = shopName;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);

//get seller information with user id
router.get(
  "/user-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await Shop.findById(req.params.id);

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
