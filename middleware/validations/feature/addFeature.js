import { body, validationResult } from 'express-validator';

const schemaValidations = (function () {
    return [
        body("name")
        .exists().withMessage("Feature name is required")
        .isLength({ min: 4 }).withMessage("Feature name should be greater than 3 character"),
        body("description")
        .exists().withMessage("Feature description is required")
        .isLength({ min: 4 }).withMessage("Feature description should be greater than 3 character"),
        body("status")
        .exists().withMessage("Status is required")
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