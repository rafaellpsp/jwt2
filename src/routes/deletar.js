const express = require('express');
const { deletar } = require('../controllers/deletar');
const router = express.Router();

router.delete('/',deletar)


module.exports = router;