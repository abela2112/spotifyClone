const { model, Schema } = require("mongoose");
const Joi = require("joi");
const albumSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: Schema.Types.ObjectId, ref: "artist" },
  albumCover: { type: String },
  releaseDate: { type: Date, default: Date.now() },
  songs: { type: [Schema.Types.ObjectId] },
});

const validate = (album) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    albumCover: Joi.string().allow(),
  });
  return schema.validate(album);
};
const Album = model("album", albumSchema);
module.exports = { Album, validate };
