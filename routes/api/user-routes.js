//SET-UP FOR EXPRESS.JS
const router = require('express').Router();

//IMPORT FUNCTIONALITY VIA CONTROLLER METHODS
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

//SET GET AND POST ROUTES TO  /API/USERS
router
    .route('/')
    .get(getAllUser)
    .post(createUser);
 

//SET GET ONE, PUT, AND DELETE AT /API/USERS/:ID
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;