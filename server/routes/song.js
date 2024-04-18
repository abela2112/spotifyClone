const express = require("express");
const { auth, admin, validObjectId } = require("../middleware");
const {
  createSong,
  getAllSong,
  getSingleSong,
  deleteSong,
  updateSong,
} = require("../controller/song");
const router = express.Router();
router.get("/", getAllSong);
router.get("/:id", getSingleSong);
router.post("/create", auth, createSong);
router.put("/:id", [validObjectId, auth], updateSong);
router.delete("/:id", [validObjectId, auth], deleteSong);
//router.put("/likes/:id", [validObjectId, auth], likeSong);
//router.get("/like", auth, getLikedSongs);

module.exports = router;
