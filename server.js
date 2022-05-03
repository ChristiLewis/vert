//IMPORT TO INITIALIZE MONGOOSE FOR MONGODB
const mongoose = require('mongoose');
const express = require('express');
const { db } = require('./models/Thought');
const res = require('express/lib/response');
const { User } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// EXPORTS TO THE .ENV DATABASE OR THE DEFAULT LOCALHOST - LOCAL MONGODB SERVER'S DATABASE
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vert', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

//TESTING TO ADD USER AND FRIEND ROUTES DIRECTLY HERE PER MOD 18 ACTIVITY 2 USER AS THE MODEL AND FRIEND AS THE SUBDOCUMENT VIA TYPES

//CREATE A NEW USER
app.post('/api/users', ({ body }, res) => {
    User.create(body)
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            res.json(err);
        });
});

//RETRIEVE ALL USERS
app.get('api/users', (req, res) => {
    User.find()
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            res.json(err);
        });
});

//RETRIEVE ONE USER BY ID
app.post('/api/users/:userId', ({ params, body }, res) => {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbUser => {
            if (!dbUser) {
                res.json({ message: 'No user found with this id!' })
                return;
            }
            res.json(dbUser);
        });
});

app.delete('/api/users/:userId', ({ params }, res) => {
    User.findOneAndDelete({ _id: params.id })
        .then(dbUser => {
            if (!dbUser) {
                res.json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});

//CREATE A NEW FRIEND FOR A USER
app.post('/api/users/:userId/friends', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
    )
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//DELETE A FRIEND FROM A USER
app.delete('/api/users/:userId/friends/:friendId', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.notebookId },
        { $pull: { friends: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
    )
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//CALL VIA THE EVENT LISTENER
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));