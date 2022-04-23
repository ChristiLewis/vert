//IMPORT EXPRESS AND CONTROLLER FUNCTIONALITY
const router = require('express').Router();
const { addContinue, removeContinue } = require('../../controllers/continue-controller');

//SET A POST ROUTE TO /API/CONTINUES/:THOUGHTID VIA THE ADDCONTINUE() METHOD
router.route('/:thoughtId').post(addContinue);

//USE A DELETE CALLBACK VIA REMOVECOMMENT() METHOD SET-UP AS THE ROUTE /API/CONTINUES/:THOUGHTID/:CONTINUEID 
router.route('/:thoughtId/:continueId').delete(removeContinue);

//EXPORT THIS ROUTER
module.exports = router;