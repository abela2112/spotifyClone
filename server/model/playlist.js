const { model, Schema, SchemaTypes } = require("mongoose");
const Joi = require("joi");

const playlistSchema = new Schema({
  name: { type: String, required: true },
  user: { type: SchemaTypes.ObjectId, required: true },
  songs: { type: Array, required: true },
  desc: { type: String },
  img: { type: String, required: true },
});
const validate = (playlist) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    desc: Joi.string().allow(),
    songs: Joi.array().items(Joi.string()),
    user: Joi.string().required(),
    img: Joi.string().allow(""),
  });
  return schema.validate(playlist);
};
const Playlist = model("playlist", playlistSchema);
module.exports = { Playlist, validate };
