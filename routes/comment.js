const router = require('express').Router();

const controller = require('../controllers/comment');
const {
    validateToken,
    validateBody,
    validateParam
} = require('../utils/validator');
const {
    AllSchema,
    CommentSchema
} = require('../utils/schema');


router.post('/', validateToken, validateBody(CommentSchema),controller.add);

router.delete('/:id',validateToken, validateParam(AllSchema.id, 'id'), controller.drop);

module.exports = router;