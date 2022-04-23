//IMPORT MODELS
const { Continue, Thought } = require('../models');

const continueController = {
    //ADD CONTINUE TO THOUGHT
    addContinue({ params, body }, res) {
        console.log(body);
        Continue.create(body)
            .then(({ _id }) => {
                return Thought.findOneAndUpdate({ _id: params.thoughtId },
                    { $push: { continues: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought note found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    //ADDREPLY
    addReply({ params, body }, res) {
        Continue.findOneAndUpdate(
            { _id: params.continueId },
            { $push: { replies: body } },
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought note found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    //REMOVE CONTINUE FROM THOUGHT
    removeContinue({ params }, res) {
        Continue.findOneAndDelete({ _id: params.continueId })
            .then(deletedContinue => {
                if (!deletedContinue) {
                    return res.status(404).json({ message: 'No continue note with this id!' });
                }
                return Thought.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $pull: { continues: params.continueId } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought note found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    //REMOVEREPLY
    removeReply({ params }, res) {
        Continue.findOneAndUpdate(
            { _id: params.continueId },
            { $pull: { replies: { replyId: params.replyId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }

};

module.exports = continueController;