const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateReflection(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : "";
    data.link = !isEmpty(data.link) ? data.link : "";
    data.department = !isEmpty(data.department) ? data.department : "";
    data.post = !isEmpty(data.post) ? data.post : "";

    // Validate department
    const departments = [
        "Mechanical and Aerospace Engineering (MAE)",
        "Civil, Coastal, and Environmental Engineering (ESSIE)",
        "Agricultural and Biological Engineering (ABE)",
        "Biomedical Engineering (BME)",
        "Chemical Engineering (CHEME)",
        "Computer and Information Science and Engineering (CISE)",
        "Electrical and Computer Engineering (ECE)",
        "Industrial and Systems Engineering (ISE)",
        "Materials Science and Engineering (MSE)",
        "Nuclear Engineering (NE)",
    ];

    const validHosts = ["forms.google.com", "docs.google.com", "forms.gle"];

    // Validate title
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required!";
    }

    // Validate link
    if (Validator.isEmpty(data.link)) {
        errors.link = "Forms link field is required!";
    } else if (
        !Validator.isURL(data.link, {
            protocols: ["https"],
            require_protocol: true,
            require_tld: true,
        })
    ) {
        errors.link = "Invalid forms link!";
    } else if (!validHosts.includes(new URL(data.link).host)) {
        errors.link = "Invalid forms link!";
    }

    // Validate department
    if (Validator.isEmpty(data.department)) {
        errors.department = "Department field required!";
    } else if (!departments.includes(data.department)) {
        errors.department = "Invalid department!";
    }

    //Validate post
    if (Validator.isEmpty(data.post)) {
        errors.post = "Post field is required!";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
