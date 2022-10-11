const router = require('express').Router();
const controller = require('../controllers/category');
const {
    saveFile
} = require('../utils/gallery');
const {
    CatSchema,AllSchema
} = require('../utils/schema');
const {
    validateBody,validateParam, validateToken
} = require('../utils/validator');

router.get('/', controller.all);
router.post('/', validateToken,validateBody(CatSchema), saveFile, controller.add);

router.route('/:id')
    .get([validateParam(AllSchema.id,'id'),controller.get]);

module.exports = router;