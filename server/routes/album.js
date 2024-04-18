const {
  createAlbum,
  getAllAlbum,
  getSingleALbum,
  deleteAlbum,
  updateAlbum,
} = require("../controller/album");
const router = require("express").Router();

router.route("/").get(getAllAlbum).post(createAlbum);
router.route("/:id").get(getSingleALbum).put(updateAlbum).delete(deleteAlbum);

module.exports = router;
