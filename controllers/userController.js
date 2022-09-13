import { User, Thought } from "../models/index.js";


const getAllUsers = (req, res) => {
      User.find({})
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
}
const getSingleUser = (req, res) => {
      User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
        .select('-__v')
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user found with this particular ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
}   

const newUser = (req, res) => {
      User.create(req.body)
        .then((newUserData) => res.json(newUserData))
        .catch((err) => res.status(500).json(err));
}   
 
const updateUser = (req, res) => {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                ? res.status(404).json ({ message: "No user found with this particular ID" })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
}    

const deleteUser = (req, res) => {
        User.findOneandDelete({ _id: req.params.userId })
         .then((user) =>
            !user
                ? res.status(404).json({ message: "No user found with this particular ID" })
                : Thought.deleteMany({ _id: { $in: user.thoughts } })
         )
         .then(() => res.json ({ message: "User and associated thoughts deleted" }))
         .catch((err) => res.status(500).json(err));
}    

const addFriend = (req, res) => {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
            .then((user) =>
               !user
                 ? res.status(404).json({ message: "No user found with this particular ID" })
                 : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
}    

const deleteFriend = (req, res) => {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { new: true }
        )
            .then((user) =>
               !user
                 ? res.status(404).json({ message: "No user found with this particular ID" })
                 : res.json(user)    
            )
            .catch((err) => res.status(500).json(err));
}

export { getAllUsers, getSingleUser, newUser, updateUser, deleteUser, addFriend, deleteFriend };