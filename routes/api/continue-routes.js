//IMPORT EXPRESS AND CONTROLLER FUNCTIONALITY
const router = require('express').Router();
const {
    addContinue,
    removeContinue,
    addReply,
    removeReply
} = require('../../controllers/continue-controller');

//SET A POST ROUTE TO /API/CONTINUES/:THOUGHTID VIA THE ADDCONTINUE() METHOD
router.route('/:thoughtId').post(addContinue);

//USE A DELETE CALLBACK VIA REMOVECOMMENT() METHOD SET-UP AS THE ROUTE /API/CONTINUES/:THOUGHTID/:CONTINUEID  ---> ADD REPLY UPDATING FUNCTIONALITY
router
    .route('/:thoughtId/:continueId')
    .put(addReply)
    .delete(removeContinue);

//DELETE ROUTE FOR REPLY
router
    .route('/:thoughtId/:continueId/:replyId')
    .delete(removeReply);

//EXPORT THIS ROUTER
module.exports = router;