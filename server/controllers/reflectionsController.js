const User = require("../models/User");
const Reflection = require("../models/Reflection");
const validateReflection = require("../validate/reflection");

// @route POST api/reflections/createReflection
// @desc Create a reflection in the database
// @access Admin
const createReflection = async (req, res) => {
    // Form Validation
    const { errors, isValid } = validateReflection(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    //Check databse for valid user
    User.findOne({ _id: req.body.user_id }).then((user) => {
        // Make sure user exists
        if (!user) {
            return res.status(404).json({ usernotfound: "Invalid user id!" });
        } else {
            //make reflection and add to database
            const newReflection = new Reflection({
                title: req.body.title,
                department: req.body.department,
                poster: user._id,
                date: req.body.date,
                comments: [],
            });

            newReflection
                .save()
                .then((reflection) => res.json(reflection))
                .catch((err) => console.log(err));
        }
    });
};

// @route POST api/reflections/deleteReflection
// @desc Delete a reflection in the database by ID
// @access Admin
const deleteReflection = async (req, res) => {
    // Verify that the user has access level "administrator"
    if (req.user.accessLevel != "administrator") {
        return res.status(400).json({
            accessLevel: "Need administrator privileges to delete reflection!",
        });
    }

    Reflection.findByIdAndDelete(req.body.reflectionID, (err) => {
        if (err) {
            return res
                .status(400)
                .json({ reflectionnotfound: "Reflection not found!" });
        } else {
            console.log("Deleted reflection ID " + req.body.reflectionID);
            res.json({ success: true });
        }
    });
};

// @route POST api/reflections/commentOnReflection
// @desc Comment on a reflection by ID
// @access User
const commentOnReflection = async (req, res) => {};

// @route GET api/reflections/getDepartmentReflections
// @desc Return all reflections in the department of user
// @access User
const getDepartmentReflections = async (req, res) => {
    // req.
};

// @route GET api/reflections/getAllReflections
// @desc Return all reflections in the database
// @access Admin
const getAllReflections = async (req, res) => {
    // Verify that the user has access level "administrator"
    if (req.user.accessLevel != "administrator") {
        return res.status(400).json({
            accessLevel: "Need administrator privileges to delete user!",
        });
    }

    Reflection.find()
        .then((reflections) => {
            return res.json(reflections);
        })
        .catch((error) => {
            return res.send(error);
        });
};

exports.createReflection = createReflection;
exports.deleteReflection = deleteReflection;
exports.commentOnReflection = commentOnReflection;
exports.getDepartmentReflections = getDepartmentReflections;
exports.getAllReflections = getAllReflections;
