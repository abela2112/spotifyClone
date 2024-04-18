const { Album, validate } = require("../model/album");

const getAllAlbum = async (req, res) => {
  const album = await Album.find().sort({ createdAt: 1 });
  res.status(200).json({ data: album, success: true });
};

const createAlbum = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res
      .status(500)
      .json({ success: false, message: error.details[0].message });
  }

  const { name, artist, albumCover, releaseDate } = req.body;

  const album = await Album.create({ name, artist, albumCover, releaseDate });
  res.status(200).json({ success: true, data: album });
};

const getSingleALbum = async (req, res) => {
  const { id } = req.params;
  const album = await Album.findById(id);
  if (album) {
    return res.status(200).json({ success: true, data: album });
  } else {
    res.status(404).json({ success: false, message: "No album found" });
  }
};

const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const album = await Album.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json({ data: album, success: true });
};

const deleteAlbum = async (req, res) => {
  const { id } = req.params;
  const album = await Album.findByIdAndDelete(id);
  res.status(200).json({ message: "deleted successfully", success: true });
};

module.exports = {
  createAlbum,
  getAllAlbum,
  getSingleALbum,
  deleteAlbum,
  updateAlbum,
};
