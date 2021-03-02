import { body, validationResult } from 'express-validator';

const schemaValidations = (function () {
    return [
        body("name")
        .exists().withMessage("Username is required")
        .isLength({ min: 4 }).withMessage("Username should be greater than 3 character"),
        body("password")
        .exists().withMessage("Password is required")
        .isLength({ min: 4 }).withMessage("Password should be greater than 3 character"),
    ];
})();

function handlingErrors (req, res, next) {
    const errors = validationResult(req);
    errors.msg = "Password should be 5 symbols";
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.msg });
    }
    next();
}

export default {
    schemaValidations,
    handlingErrors
}