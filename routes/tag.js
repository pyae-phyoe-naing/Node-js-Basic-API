const router = require('express').Router();

const controller = require('../controllers/tag');
const {
    validateToken,validateBody
} = require('../utils/validator');
const {
    TagSchema
} = require('../utils/schema');
const { saveFile } = require('../utils/gallery');

router.get('/',  controller.all);
router.post('/', validateToken,validateBody(TagSchema), saveFile, controller.add);

module.exports = router;