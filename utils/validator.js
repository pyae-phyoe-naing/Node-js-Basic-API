module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            var result = schema.validate(req.body);
            if (result.error) {
                next(new Error(result.error.details[0].message));
            } else {
                next();
            }
        }
    }
}