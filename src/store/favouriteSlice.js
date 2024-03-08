import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';


// Async thunks for adding and removing movies from favorites
export const addToFavorites = createAsyncThunk(
  'favorites/add',
  async ({ userFrom, movieId, title, posterPath, movieRunTime, releaseDate, tagLine, overview   }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/favorites', { userFrom, movieId, title, posterPath, movieRunTime, releaseDate, tagLine, overview   });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  'favorites/remove',
  async ({ userFrom, movieId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/favorites/${userFrom}/${movieId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//fetch ffavourites

export const fetchFavorites = createAsyncThunk(
  'favorites/fetch',
   async ( userFrom , { rejectWithValue }) => {
     try{
      const response = await axios.get(`http://localhost:5000/favorites/${userFrom}`);
      return response.data;
     } catch(error) {
       return rejectWithValue(error.response.data);
     }
   }
)

// Define favorite movies slice
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    movies: [],
    loading: false,
    error: null
  },
  reducers: {
    // Add reducer logic here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        // Update state after adding movie to favorites
        if (!Array.isArray(state.movies)) {
          state.movies = [];
        }
        state.loading = false;
        state.movies = [...state.movies, action.payload];
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        // Handle error if adding movie to favorites fails
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        // Update state after removing movie from favorites
        state.loading = false;
        // state.movies = state.movies.filter(movie => movie.movieId !== action.payload.movieId);
        state.movies = Array.isArray(state.movies) ? state.movies.filter(movie => movie.movieId !== action.payload.movieId) : [];
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        // Handle error if removing movie from favorites fails
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Export actions and reducer

export const favoritesActions = favoritesSlice.actions;
export const selectFavorites = (state) => state.favorites.movies;
export default favoritesSlice.reducer;
