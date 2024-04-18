const express = require("express");
const { auth, admin, validObjectId } = require("../middleware");
const router = express.Router();
const {
  signIn,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  updateRole,
  addFavoriteSongs,
  getFavoriteSongs,
  addToPlaylist,
  getPlaylists
} = require("../controller/user.js");

router.post("/login", signIn);
router.put("/updateRole/:id", admin, updateRole);
//get all user
router.get("/", admin, getAllUsers);

//get a user
router.get("/:id", [validObjectId, auth], getUser);

//update a user
router.put("/:id", [validObjectId, auth], updateUser);
router.post('/favorites',  auth,addFavoriteSongs)
router.get('/favorites/:userId',  auth,getFavoriteSongs)

router.post('/playlist',  auth,addToPlaylist)
router.get('/playlist/:userId',  auth,getPlaylists)

// delete a user
router.delete("/:id", [validObjectId, admin], deleteUser);
module.exports = router;
