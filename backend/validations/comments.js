const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

// validateCommentInput is a combination Express middleware that uses the `check`
// middleware to validate the keys in the body of a request to create/edit a comment
const validateCommentInput = [
  check('text')
    .exists({ checkFalsy: false })
    .isLength({ min: 5, max: 140 })
    .withMessage('Comment must be between 5 and 140 characters'),
  handleValidationErrors,
];

module.exports = validateCommentInput;
