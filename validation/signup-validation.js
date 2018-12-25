const Validator = require('validator');

module.exports = function validateSignup(data) {
    let errors = {}
    username = data[0];
    password = data[1];
    email = data[2];
    confirmPassword = data[3]

    if(!Validator.isLength(username, {min: 2, max: 30})) {
        errors.username = 'Your username has to be between 2 - 30 characters'
    }

    if(!Validator.isLength(password, {min: 5, max: 30})) {
        errors.password = 'Your password has to be between 5 - 30 characters'
    }

    if (!Validator.equals(password, confirmPassword)) {
        errors.confirmPassword = 'Your passwords don\'t match'
    }

    if(!Validator.isEmail(email)) {
        errors.email = 'Enter a proper email'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}