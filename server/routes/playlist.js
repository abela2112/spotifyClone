const {
  getPlaylists,
  createPlaylist,
  randomPlaylist,
  addSongs,
  editPlaylist,
} = require("../controller/playlist");

const { auth, admin, validObjectId } = require("../middleware");
const express = require("express");
const router = express.Router();

router.get("/", auth, getPlaylists);
router.put("/:id", [validObjectId, auth], editPlaylist);
router.put("/add-song", [validObjectId, auth], addSongs);
router.post("/create", auth, createPlaylist);
router.get("/random", auth, randomPlaylist);

module.exports = router;
