const path = require("path");
const express = require("express");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const multer = require("multer");

const router = express.Router({ mergeParams: true });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
});

var upload = multer({ storage: storage });

// @desc      Get index page
// @route     GET /
// @access    Public
router
    .route("/")
    .get(
        asyncHandler(async (req, res, next) => {
            return res.status(200).render("upload", (err, html) => {
                if (err) {
                    return next(new ErrorResponse("Problem Rendering", 500));
                } else {
                    res.send(html);
                }
            });
        })
    )
    .post(
        upload.single("file"),
        asyncHandler(async (req, res, next) => {
            return res.status(200).redirect("/");
        })
    );

module.exports = router;
