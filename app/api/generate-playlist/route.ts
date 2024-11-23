// import {
//   GoogleGenerativeAI,
//   GenerateContentResult,
// } from "@google/generative-ai";
// import { headers } from "next/headers";

// const basic = Buffer.from(
//   process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
// ).toString("base64");

// const getSpotifyAccessToken = async () => {
//   const response = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       Authorization: "Basic" + basic,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: new URLSearchParams({
//       grant_type: "client_credentials",
//     }),
//   });
// };
