const express = require('express');
const { listar } = require('../controllers/listar')
const router = express.Router();

router.post('/', listar)


module.exports = router;