// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Action creators
// export const signupUser = createAsyncThunk(
//   'auth/signupUser',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:5000/user', userData);
//       const authToken = response.data.token; 
//       localStorage.setItem('authToken', authToken);
//       return response.data.user;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );



// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:5000/login', userData);
//       const authToken = response.data.token;
//       localStorage.setItem('authToken', authToken); 
//       return response.data.user;
//     } catch (error) {
//       // Handle error and return with rejectWithValue
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

// // Define slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     loading: false,
//     error: null
//   },
//   reducers: {
//     logout(state) {
//       localStorage.removeItem('authToken');
//       state.user = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signupUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signupUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.loading = false;
//       })
//       .addCase(signupUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.loading = false;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   }
// });

// // Export actions and reducer
// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

// authSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Action creators
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/user', userData);
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/login', userData);
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      return user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null
  },
  reducers: {
    logout(state) {
      localStorage.removeItem('authToken');
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
