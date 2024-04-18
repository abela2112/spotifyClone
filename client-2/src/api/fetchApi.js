import axios from "axios";

export const baseurl = "http://localhost:5000";

export const validateUser = async (token) => {
  const { data } = await axios.get("http://localhost:5000/api/google", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return data;
};

export const getAllUsers = async (authToken) => {
  const { data } = await axios.get(`${baseurl}/api/users`, {
    headers: {
      "x-auth-token": authToken,
    },
  });
  return data;
};

export const getAllSongs = async (authToken) => {
  const { data } = await axios.get(`${baseurl}/api/songs`, {
    headers: {
      "x-auth-token": authToken,
    },
  });
  return data;
};

export const getAllAlbums = async (authToken) => {
  const { data } = await axios.get(`${baseurl}/api/albums`, {
    headers: {
      "x-auth-token": authToken,
    },
  });
  return data;
};

export const getAllArtists = async (authToken) => {
  const { data } = await axios.get(`${baseurl}/api/artists`, {
    headers: {
      "x-auth-token": authToken,
    },
  });
  return data;
};

export const userRoleUpdate = async (authToken, userId, role) => {
  const { data } = await axios.put(
    `${baseurl}/api/users/updateRole/${userId}`,
    { role },
    {
      headers: {
        "x-auth-token": authToken,
      },
    }
  );

  return data;
};

export const deleteUsers = async (authToken, userId) => {
  const { data } = await axios.delete(`${baseurl}/api/users/${userId}`, {
    headers: {
      "x-auth-token": authToken,
    },
  });
  return data;
};
