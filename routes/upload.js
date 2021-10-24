const path = require("path");
const express = require("express");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const multer = require("multer");
const fs = require('fs');

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

function csvJSON(csv) {
    var lines = csv.split("\n");

    var result = [];

    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}

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
            const data = fs.readFileSync('./' + req.file.path, 'utf8');
            fs.writeFileSync("./public/uploads/" + req.file.filename + ".json", csvJSON(data));
            return res.redirect("/app/" + req.file.filename)
        })
    );

module.exports = router;
