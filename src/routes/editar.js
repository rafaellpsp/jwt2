const express = require('express');
const { editar } = require('../controllers/update');
const router = express.Router();

router.put('/',editar)


module.exports = router;