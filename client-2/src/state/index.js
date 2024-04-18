import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: "",
  allUsers: null,
  allArtists: null,
  allAlbums: null,
  allSongs: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.data;
      state.token = action.payload.token;
    },
    setLogOut: (state) => {
      state.user = null;
      state.token = "";
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload.data;
    },
    setAllAlbum: (state, action) => {
      state.allAlbums = action.payload.data;
    },
    setAllSongs: (state, action) => {
      state.allSongs = action.payload.data;
    },
    setAllArtist: (state, action) => {
      state.allArtists = action.payload.data;
    },
    updateUser: (state, action) => {
      const update = state.allUsers.map((user) => {
        if (user._id === action.payload.data._id) {
          return action.payload.data;
        } else {
          return user;
        }
      });
      state.allUsers = update;
    },
  },
});

export const {
  setLogin,
  setLogOut,
  setAllAlbum,
  setAllArtist,
  setAllSongs,
  setAllUsers,
  updateUser,
} = authSlice.actions;
export default authSlice.reducer;
