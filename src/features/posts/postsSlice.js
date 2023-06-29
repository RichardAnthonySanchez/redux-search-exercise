import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    filterPosts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      return state.filter((post) => {
        const title = post.title.toLowerCase();
        const body = post.body.toLowerCase();
        return title.includes(searchTerm) || body.includes(searchTerm);
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const { filterPosts } = postsSlice.actions;

export default postsSlice.reducer;
