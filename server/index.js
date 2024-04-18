const express = require("express");
const connect = require("./database/connect");
const userRoute = require("./routes/user");
const songRoute = require("./routes/song");
const fs = require("fs");
//const playlistRoute = require("./routes/playlist");
//const searchRoute = require("./routes/search");
const googleRoute = require("./routes/authGoogle");
const albumRoute = require("./routes/album");
const artistRoute = require("./routes/artist");
const cors = require("cors");
const { auth } = require("./middleware");
require("dotenv").config();
require("express-async-errors");
const multer = require("multer");
const { createSong } = require("./controller/song");
const { Song } = require("./model/song");
const { createUser } = require("./controller/user");

const uploadMiddleware = multer({ dest: "uploads/" });
const app = express();

const port = process.env.PORT || 5000;
app.use(cors({ origin: "http://127.0.0.1:5173" }));
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/api/users", userRoute);
app.use("/api/songs", songRoute);
//app.use("/api/playlists", playlistRoute);
//app.use("/api/search", searchRoute);
app.use("/api/google", googleRoute);
app.use("/api/albums", auth, albumRoute);
app.use("/api/artists", auth, artistRoute);
app.use('/api/user/signup',uploadMiddleware.single('profileImage'),createUser)
app.use(
  "/api/song/create",
  uploadMiddleware.fields([
    { name: "song", maxCount: 1 },
    { name: "img", maxCount: 8 },
  ]),
  async (req, res) => {
    // console.log(req.files["song"]);
    // console.log(req.files["img"]);

    const { img, song } = req.files;
    const imageFile = img[0];
    const songFile = song[0];

    const imagExt = imageFile.originalname.split(".")[1];
    const imagNewpath = imageFile.path + "." + imagExt;
    fs.renameSync(imageFile.path, imagNewpath);

    const songExt = songFile.originalname.split(".")[1];
    const songNewpath = songFile.path + "." + songExt;
    fs.renameSync(songFile.path, songNewpath);
    const {
      body: { title,artist,genere,language,country },
      
    } = req;
    const newSong = await Song.create({
      title,
      artist,
      genere,
      language,
      country ,
      song: songNewpath,
      img: imagNewpath,
      
    });

    res.status(200).json({ success: true, data: newSong });
  }
);
const start = () => {
  connect(process.env.MONGODB_URL);
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
};

start();
