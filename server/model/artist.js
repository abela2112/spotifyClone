const { model, Schema } = require("mongoose");

const artistSchema = new Schema({
  name: { type: String, required: true },
  biography: { type: String },
  picture: { type: String },
});
const validate = (artist) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    biography: Joi.string().allow(),
    picture: Joi.string().allow(),
  });
  return schema.validate(artist);
};
const Artist = model("artist", artistSchema);
module.exports = { Artist, validate };
