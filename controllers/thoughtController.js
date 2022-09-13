import { Thought, User } from "../models/index.js";

getAllThoughts(req, res) 
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    
getSingleThought(req, res) 
      Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that particular ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
   
createThought(req, res) 
      Thought.create(req.body)
        .then(( _id ) => {
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: _id } },
            { new: true }
          );
        })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: "No user found with this particular ID" })
            : res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
   
updateThought(req, res) 
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought found with this particular ID!' })
            : res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    
deleteThought(req, res) 
      Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought found with this particular ID' })
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              )
        )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'Thought deleted, but no user found with this particular ID' })
            : res.json({ message: 'Thought successfully deleted' })
        )
        .catch((err) => res.status(500).json(err));
    

createReaction(req, res) 
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { responses: req.body } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought found with this particular ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
   
deleteReaction(req, res) 
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought found with this particular ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));

export {getAllThoughts, getSingleThought, createThought, updateThought, deleteThought, createReaction, deleteReaction};
   