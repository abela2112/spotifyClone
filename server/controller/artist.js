const { Artist, validate } = require("../model/artist");

const getAllArtist = async (req, res) => {
  const artist = await Artist.find().sort({ createdAt: 1 });
  res.status(200).json({ data: artist, success: true });
};

const createArtist = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res
      .status(500)
      .json({ success: false, message: error.details[0].message });
  }

  const { name, biography, picture } = req.body;

  const artist = await Artist.create({ name, biography, picture });
  res.status(200).json({ success: true, data: artist });
};

const getSingleArtist = async (req, res) => {
  const { id } = req.params;
  const artist = await Artist.findById(id);
  if (artist) {
    return res.status(200).json({ success: true, data: artist });
  } else {
    res.status(404).json({ success: false, message: "No Artist found" });
  }
};

const updateArtist = async (req, res) => {
  const { id } = req.params;
  const artist = await Artist.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json({ data: artist, success: true });
};

const deleteArtist = async (req, res) => {
  const { id } = req.params;
  const artist = await Artist.findByIdAndDelete(id);
  res.status(200).json({ message: "deleted successfully", success: true });
};

module.exports = {
  createArtist,
  getAllArtist,
  getSingleArtist,
  deleteArtist,
  updateArtist,
};
