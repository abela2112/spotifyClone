// const { User } = require("../model/user");
// const { Song } = require("..");
// const { Playlist, validate } = require("../model/playlist");
// const Joi = require("joi");

// //create a new Playlist
// const createPlaylist = async (req, res) => {
//   const { id } = req.user;
//   const { error } = validate(req.body);
//   if (error) return res.status(400).json({ message: error.details[0].message });

//   const playList = await Playlist.create({ ...req.body, user: id });

//   const user = await User.findById(id);
//   user.playlist.push(playList._id);
//   await user.save();
//   res.status(200).json({ message: "created successfully", data: playList });
// };

// //edit playlist
// const editPlaylist = async (req, res) => {
//   const { id } = req.params;
//   const { error } = validate(req.body);
//   if (error) return res.status(400).json({ message: error.details[0].message });
//   const playList = await Playlist.findById(id);
//   if (!req.user.id.equals(playList.user)) {
//     return res.status(403).json({ message: "access denied " });
//   }
//   const updatedPlaylist = await Playlist.findByIdAndUpdate(id, {
//     $set: req.body,
//   });
//   res
//     .status(200)
//     .json({ message: "updated successfully", data: updatedPlaylist });
// };

// //add songs to playlist
// const addSongs = async (req, res) => {
//   const { playlistId, songId } = req.body;
//   const schema = Joi.object({
//     playlistId: Joi.string().required(),
//     songId: Joi.string().required(),
//   });
//   const { error } = schema.validate(req.body);
//   if (error) return res.status(400).json({ message: error.details[0].message });

//   const playlist = await Playlist.findById(playlistId);
//   const song = await Song.findById(songId);
//   const index = playlist.indexOf(song._id);
//   if (!req.user.id.equals(playlist.user)) {
//     return res.status(403).json({ message: "access denied " });
//   }
//   if (index === -1) {
//     playlist.songs.push(song._id);
//   } else {
//     playlist.songs.splice(index, 1);
//   }
//   await playlist.save();
//   res.status(201).json({ data: playlist, message: "added to playlist" });
// };

// const getPlaylists = async (req, res) => {
//   const user = await User.findById(req.user.id);
//   const playlist = await User.find({ _id: user.playlist });
//   res.status(200).json({ data: playlist });
// };

// const randomPlaylist = async (req, res) => {
//   const playlist = await Playlist.aggregate([{ $sample: { size: 10 } }]);
//   res.status(200).json({ data: playlist });
// };

// module.exports = {
//   getPlaylists,
//   createPlaylist,
//   randomPlaylist,
//   addSongs,
//   editPlaylist,
// };
