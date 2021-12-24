const express = require('express');
const router = express.Router();
const cntrlAuth = require('../controllers/Auth.controller')
const cntrlUser = require('../controllers/user.controller')

router.post('/registrer', cntrlUser.registrer);
router.post('/login', cntrlAuth.ConnexionUser); // pour sign In

module.exports = router;