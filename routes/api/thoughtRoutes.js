import express from "express";
const router = express.Router();
import {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} from "../../controllers/thoughtController.js"

router.route("/").get(getAllThoughts).post(createThought);

router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);

router.route("/:thoughtId/reactions").post(createReaction).delete(deleteReaction);

export default router;
