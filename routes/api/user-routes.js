//SET-UP FOR EXPRESS.JS
const router = require('express').Router();

//IMPORT FUNCTIONALITY VIA CONTROLLER METHODS
const {
 
} = require('../../controllers/user-controller');

//SET GET AND POST ROUTES TO  /API/USERS
router
    .route('/')
 

//SET GET ONE, PUT, AND DELETE AT /API/USERS/:ID
router.route('/:id')



module.exports = router;