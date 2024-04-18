const { model, Schema } = require("mongoose");
const Joi = require("joi");
const Jwt = require("jsonwebtoken");
const bycryptjs=require('bcryptjs')
const passwordComplexity = require("joi-password-complexity");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },

    date: {
      type: Date,
      default: Date.now(),
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    picture: {
      type: String,
    },
    user_id: {
      type: String,
    },

    likedSongs: {
      type: [String],
      default: [],
    },
    playlist: {
      type: [String],
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function () {
  const salt = await bycryptjs.genSalt(10);
  this.password = await bycryptjs.hash(this.password, salt);
});
userSchema.methods.generateAuthToken = function () {
  const token = Jwt.sign(
    {
      id: this._id,
      name: this.name,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
  return token;
};
const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity().required(),
  });
  return schema.validate(user);
};
const User = model("user", userSchema);
module.exports = { User, validate };
