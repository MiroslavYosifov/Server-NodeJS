import { body, validationResult } from 'express-validator';

const schemaValidations = (function () {
    return [
        body("name")
        .exists().withMessage("Suggestion name is required")
        .isLength({ min: 4 }).withMessage("Suggestion name should be greater than 3 character"),
        body("description")
        .exists().withMessage("Suggestion description is required")
        .isLength({ min: 4 }).withMessage("Suggestion description should be greater than 3 character")
    ];
})();

function handlingErrors (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors });
    }
    next();
}

export default {
    schemaValidations,
    handlingErrors
}