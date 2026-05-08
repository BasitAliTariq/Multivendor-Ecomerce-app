const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { upload } = require("../multer");
const Shop = require("../model/shop");
const Event = require("../model/event");
const ErrorHandler = require("../utils/ErrorHandler");
const { cloudinary, getPublicIdFromUrl } = require("../utils/cloudinary");
const { isSeller } = require("../middleware/auth");
const router = express.Router();

//  crete event
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => file.path);
        const eventData = req.body;
        eventData.images = imageUrls;
        eventData.shop = shop;
        const event = await Event.create(eventData);
        res.status(210).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }),
);

// get all events of a shop

router.get(
  "/get-all-events-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return new ErrorHandler(error, 400);
    }
  }),
);

// delete event of a shop

router.delete(
  "/delete-shop-event/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const eventId = req.params.id;

      const eventData = await Event.findById(eventId);

      if (!eventData) {
        return next(new ErrorHandler("event is not found with this id", 500));
      }

      if (eventData.images && eventData.images.length > 0) {
        await Promise.all(
          eventData.images.map(async (imageUrl) => {
            const publicId = getPublicIdFromUrl(imageUrl);
            if (!publicId) {
              return;
            }
            try {
              await cloudinary.uploader.destroy(publicId);
            } catch (error) {
              console.log("Cloudinary cleanup failed:", error.message || error);
            }
          }),
        );
      }

      const event = await Event.findByIdAndDelete(eventId);
      res.status(201).json({
        success: true,
        message: "Event deleted successfully!",
        id: event._id,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }),
);

// get all events of all shops

router.get(
  "/get-all-events",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find();
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }),
);

module.exports = router;
