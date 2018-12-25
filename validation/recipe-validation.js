const Validator = require('validator');

module.exports = function validateRecipe(data) {
    let errors = {}

    name = data[0]
    description = data[1];
    instructions = data[2];

    if(!Validator.isLength(name, {min: 3})) {
        errors.name = 'The Recipe name has to be at least 3 characters long'
    }

    if(!Validator.isLength(description, {min: 10})) {
        errors.description = 'The Recipe description has to be at least 10 characters long'
    }

    if(!Validator.isLength(instructions, {min: 15})) {
        errors.instructions = 'The Recipe instructions have to be at least 15 characters long'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}