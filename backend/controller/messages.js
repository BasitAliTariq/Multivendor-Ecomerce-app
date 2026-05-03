const ErrorHandler = require("../utils/ErrorHandler");
const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Messages = require("../model/messages");
const { upload } = require("../multer");

// Create new message
router.post(
  "/create-new-message",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      let imageUrls = [];

      // Check if files exist
      if (req.files && req.files.length > 0) {
        imageUrls = req.files.map((file) => file.filename);
      }

      // Build message data (single place)
      const messageData = {
        conversationId: req.body.conversationId,
        sender: req.body.sender,
        text: req.body.text,
        images: imageUrls,
      };

      // Save message
      const message = new Messages(messageData);
      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);

//get all messages with conversation id
router.get(
  "/get-all-messages/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messages = await Messages.find({
        conversationId: req.params.id,
      });

      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  }),
);

module.exports = router;
