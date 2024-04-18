const { User, validate } = require("../model/user");
const bycryptjs = require("bcryptjs");
const fs=require('fs')
const {Song}=require("../model/song");

const createUser = async (req, res) => {
  const { email, password, name,profileImage } = req.body;
  console.log(req.body);
  console.log(req.file)

  const { error } = validate(req.body);
  if (error) {
    return res.status(403).json({ message: error.details[0].message });
  }
  const {originalname,path}=req.file
  const imagExt = originalname.split(".")[1];
  const imagNewpath = path + "." + imagExt;
  fs.renameSync(path, imagNewpath);

  const user = await User.create({email, password, name,picture:imagNewpath });
  user.password = undefined;
  user.__v = undefined;
  res.status(200).json(user);
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const validUser =bycryptjs.compare(password, user.password);
  if (!validUser) {
    return res.status(400).json({ message: "invalid password" });
  }
  const token = user.generateAuthToken();
  user.password = undefined;
  user.__v = undefined;

  res.json({
    data: user,
    token: token,
    message: "user has successfully logged in",
  });
};
//get all users
const getAllUsers = async (req, res) => {
  const user = await User.find().select("-password -__v");
  res.status(200).json({ data: user });
};
// get a user by id
const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password -__v");
  res.status(200).json({ data: user });
};
// update a user

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  ).select("-password -__v");
  res.status(200).json({ data: user });
};

//delete a user by their id
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  res
    .status(200)
    .json({ message: "user has successfully deleted", data: user });
};
const updateRole = async (req, res) => {
  try {
    const {
      params: { id },
      body: { role},
    } = req;

    const userRole = role === "Admin" ? true : false;
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { isAdmin: userRole } },
      { new: true }
    );

    res.status(200).json({ data: user, success: true });
  } catch (error) {
    console.log(error);
  }
};

const addFavoriteSongs=async(req,res)=>{
  const {id}=req.body
  console.log('songid',id)
  const song=await Song.findById(id)
  
  const user=await User.findById(req.user?.id)

  if(user.likedSongs.includes(id)){
    user.likedSongs=user.likedSongs.filter((songId)=>songId!==id)

  }
  else{
    user.likedSongs.push(id)
  }
  await user.save()
  const favoriteSong=await Promise.all(
    user.likedSongs.map((id)=> Song.findById(id))
  )
  
  res.status(200).json(favoriteSong)
}

const addToPlaylist=async(req,res)=>{
  const {id}=req.body
  console.log('songid',id)
  const song=await Song.findById(id)
  
  const user=await User.findById(req.user?.id)

  if(user.playlist.includes(id)){
    user.playlist=user.playlist.filter((songId)=>songId!==id)

  }
  else{
    user.playlist.push(id)
  }
  await user.save()
  const Playlist=await Promise.all(
    user.playlist.map((id)=> Song.findById(id))
  )
  
  res.status(200).json(Playlist)
}
const getFavoriteSongs=async (req,res)=>{
  const {userId}=req.params
  const user=await User.findById(userId)
  console.log('user',user)
  const favoriteSong=await Promise.all(
    user.likedSongs.map((id)=> Song.findById(id))
  )
  console.log('favorite',favoriteSong)
  res.status(200).json(favoriteSong)
  
}


const getPlaylists=async (req,res)=>{
  const {userId}=req.params
  const user=await User.findById(userId)
  console.log('user',user)
  const playlist=await Promise.all(
    user.playlist.map((id)=> Song.findById(id))
  )
  console.log('playlist',playlist)
  res.status(200).json(playlist)
  
}
module.exports = {
  createUser,
  signIn,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  updateRole,
  addFavoriteSongs,
  getFavoriteSongs,
  addToPlaylist,
  getPlaylists
};
