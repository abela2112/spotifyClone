const router = require("express").Router();
const admin = require("../config/firebase.config");
const { User } = require("../model/user");
router.get("/", async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization?.startsWith("Bearer")) {
    res.status(500).json({ message: "there was an error" });
  }
  const token = authorization?.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      throw new Error("Invalid token");
    } else {
      const userExists = await User.findOne({ email: decodedValue.email });
      if (!userExists) {
        addToDatabse(decodedValue, req, res);
      } else {
        const { name, picture, email, email_verified, user_id } = decodedValue;
        const update = await User.findOneAndUpdate(
          { email },
          {
            name: name,
            email: email,
            picture: picture,
            email_verified: email_verified,
            user_id: user_id,
          },
          { new: true }
        );
        const user = await User.findOne({ email });
        const token = user.generateAuthToken();
        res
          .status(200)
          .json({ data: update, token: token, message: "success" });
      }
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});


const addToDatabse = async (value, req, res) => {
  const { name, picture, email, email_verified, user_id } = value;
  const user = await User.create({
    name,
    picture,
    email,
    email_verified,
    user_id,
  });
  const token = user.generateAuthToken();
  res.status(200).json({ message: "success", data: user, token: token });
};
module.exports = router;
