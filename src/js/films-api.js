import axios from "axios";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWI4NmViYWIzMzMxNDdhYTA2YjlhODk5YjY0YzYxNCIsInN1YiI6IjY1ZTc2YjQ4MzFkMDliMDE2MmUzMWE5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AB-5VH5rmU095UcQzHVjMm3vM3utfCAE_YAytC-tzY0";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
  params: {
    language: "en-US",
  },
});

export const getFilmsTrendingAccess = async () => {
  try {
    const response = await apiClient.get("/trending/movie/day");
    return response.data.results;
  } catch (error) {
    console.error(error.message);
  }
};

export const getFilmsDetails = async (id, codeWord = "") => {
  try {
    const response = await apiClient.get(`/movie/${id}${codeWord}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};



export const getFilmsSearch = async (query, page = 1) => {
  try {
    const response = await apiClient.get("/search/movie", {
      params: {
        query,
        page,
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};