const mongoose = require("mongoose");

const validObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "invalid id" });
  }
  next();
};
module.exports = validObjectId;
