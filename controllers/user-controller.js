const res = require('express/lib/response');
const { User } = require('../models');

const userController = {
    //FUNCTIONS AS METHODS GO HERE

    //GET ALL
    getAllUser(req, res) {
      
            //ADD .POPULATE METHOD TO SEE THE ACTUAL CONTINUES ASSOCIATED WITH THE User INSTEAD OF ONLY THE OBJECTID
          
        
            //ADD .SELECT() METHOD TO EDIT OUT THE RETURN OF THE _VFIELD FOR THE MODEL TOO
         
            //.SORT() METHOD IN DESCENDING ORDER
   
    },

    //GET ONE BY ID
    getUserById({ params }, res) {
      
            //ADD .POPULATE METHOD TO SEE THE ACTUAL CONTINUES ASSOCIATED WITH THE User INSTEAD OF ONLY THE OBJECTID
        
            //ADD .SELECT() METHOD TO EDIT OUT THE RETURN OF THE _VFIELD FOR THE MODEL TOO

    },

    //CREATE MODEL
    createUser({ body }, res) {
     
    },

    //UPDATE MODEL
    updateUser({ params, body }, res) {
        //ADD VALIDATOR OPTION SETTING
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      
    },

    //DELETE MODEL
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
     
    }

}

module.exports = userController;