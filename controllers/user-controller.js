const res = require('express/lib/response');
const { User } = require('../models');

const userController = {
    //FUNCTIONS AS METHODS GO HERE
    //POST NEW USER
    // postNewUser(req, res) {
    //     User.create(user)
    //         .then(dbUser => {
    //             res.json(dbUser);
    //         })
    //         .catch(err => {
    //             res.json(err);
    //         });
    // },

    //CREATE MODEL
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    //GET ALL
    getAllUser(req, res) {
        User.find({})
            //ADD .POPULATE METHOD TO SEE THE ACTUAL FRIENDSS ASSOCIATED WITH THE USER INSTEAD OF ONLY THE OBJECTID
            .populate({
                path: 'friends',
                select: '-_v'
            })
            //ADD .SELECT() METHOD TO EDIT OUT THE RETURN OF THE _VFIELD FOR THE USER MODEL TOO
            .select('-_v')
            //.SORT() METHOD IN DESCENDING ORDER
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //GET ONE BY ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            //ADD .POPULATE METHOD TO SEE THE ACTUAL FRIENDS ASSOCIATED WITH THE User INSTEAD OF ONLY THE OBJECTID
            .populate({
                path: 'friends',
                select: '-_v'
            })
            //ADD .SELECT() METHOD TO EDIT OUT THE RETURN OF THE _VFIELD FOR THE USER MODEL TOO
            .select('-_v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },


    //UPDATE MODEL
    updateUser({ params, body }, res) {
        //ADD VALIDATOR OPTION SETTING
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    //DELETE MODEL
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }

}

module.exports = userController;