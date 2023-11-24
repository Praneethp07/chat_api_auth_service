const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
router.post('/:organizationID/signup',controller.createNewUser);
router.post('/:organizationID/login',controller.login);
router.put('/:organizationID/signup',controller.createNewUser);
router.put('/:organizationID/login',controller.login);
router.get('/admin',controller.admin);
router.get('/admin/:userId',controller.getUserById);
router.delete('/admin/:userId',controller.deleteUserById);
module.exports = router;