import express from "express";
const router = express.Router();
import {
    getAllUsers,
    getSingleUser,
    newUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} from "../../controllers/userController.js";

router.route("/").get(getAllUsers).post(newUser);

router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser)

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend)