const router = require('express').Router();

const controller = require('../controllers/tag');
const {
    validateToken,
    validateBody,
    validateParam
} = require('../utils/validator');
const {
    TagSchema, AllSchema
} = require('../utils/schema');
const {
    saveFile, updateFile
} = require('../utils/gallery');

router.get('/', controller.all);
router.post('/', validateToken, validateBody(TagSchema), saveFile, controller.add);

router.route('/:id')
    .get(validateParam(AllSchema.id,'id'),controller.get)
    .patch(validateToken, validateParam(AllSchema.id,'id'),validateBody(TagSchema), updateFile, controller.patch)
    .delete(validateToken,validateParam(AllSchema.id,'id'), controller.drop);

module.exports = router;