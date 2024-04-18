// const { Song } = require("../model/song");
// const { Playlist } = require("../model/playlist");
// const search = async (req, res) => {
//   const search = req.query.search;
//   const song = await Song.find({
//     name: { $regex: search, $options: "i" },
//   }).limit(10);

//   const playlist = await Playlist.find({
//     name: { $regex: search, $options: "i" },
//   }).limit(10);
//   const result = { ...playlist, ...song };
//   res.status(200).json({ data: result });
// };
// module.exports = search;
