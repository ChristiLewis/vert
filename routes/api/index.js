const router = require('express').Router();
//IMPORT ALL ROUTES IN THE API FOLDER
const continueRoutes = require('./continue-routes');
const thoughtRoutes = require('./thought-routes');


//ADD PREFIX OF CONTINUES TO ROUTES IN CONTINUE-ROUTES.JS
router.use('/continues', continueRoutes);
// add prefix of `/thoughts` to routes created in `thought-routes.js`
router.use('/thoughts', thoughtRoutes);

module.exports = router;