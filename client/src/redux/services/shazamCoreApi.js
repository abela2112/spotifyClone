// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const shazamCoreApi = createApi({
//   reducerPath: "shazamCoreApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5000/api",
//     prepareHeaders: (headers) => {
//       headers.set("x-auth-token", "qwertyupppp");
//       return headers;
//     },
//   }),
//   endpoints: (builder) => {
//     getTopCharts: builder.query({ query: () => "/songs" });
//   },
// });
// export const { useGetTopCharts } = shazamCoreApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      headers.set("x-auth-token", "qwertyupppp");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => "v1/charts/world" }),
    getSongsByGenre: builder.query({
      query: (genre) => `api/songs`,
    }),
    // getSongsByCountry: builder.query({
    //   query: (countryCode) => `v1/charts/country?country_code=${countryCode}`,
    // }),
    // getSongsBySearch: builder.query({
    //   query: (searchTerm) =>
    //     `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    // }),
    // getArtistDetails: builder.query({
    //   query: (artistId) => `v2/artists/details?artist_id=${artistId}`,
    // }),
    getSongDetails: builder.query({
      query: ({ songid }) => `api/songs/${songid}`,
    }),
    // getSongRelated: builder.query({
    //   query: ({ songid }) => `v1/tracks/related?track_id=${songid}`,
    // }),
  }),
});

export const {
  useGetSongsByGenreQuery,
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
} = shazamCoreApi;
