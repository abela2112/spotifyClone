const { Song, validate } = require("../model/song");

const getAllSong = async (req, res) => {
  const song = await Song.find().sort({ createdAt: 1 });
  res.status(200).json(song);
};

const createSong = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res
      .status(500)
      .json({ success: false, message: error.details[0].message });
  }

  const { name, biography, picture } = req.body;

  const song = await Song.create({ name, biography, picture });
  res.status(200).json({ success: true, data: song });
};

const getSingleSong = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log();
  try {
    const song = await Song.findById(id);
    if (song) {
      return res.status(200).json({ success: true, data: song });
    } else {
      res.status(404).json({ success: false, message: "No Song found" });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateSong = async (req, res) => {
  const { id } = req.params;
  const song = await Song.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json(song);
};

const deleteSong = async (req, res) => {
  const { id } = req.params;
  const song = await Song.findByIdAndDelete(id);
  res.status(200).json({ message: "deleted successfully", success: true });
};

module.exports = {
  createSong,
  getAllSong,
  getSingleSong,
  deleteSong,
  updateSong,
};
