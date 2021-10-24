const express = require("express");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const fs = require("fs");

const router = express.Router({ mergeParams: true });

// @desc      Get index page
// @route     GET /
// @access    Public
router.get(
    "/",
    asyncHandler(async (req, res, next) => {
        const jsonData = fs.readFileSync('./public/uploads/' + req.params.fileName + ".json");
        return res.status(200).render("app", {fileName: req.params.fileName, jsonData: jsonData}, (err, html) => {
            if (err) {
                return next(new ErrorResponse("Problem Rendering", 500));
            } else {
                res.send(html);
            }
        });
    })
);

module.exports = router;