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
    sortPostsById: (state) => {
      return [...state].sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
    },
    sortPostsByTitle: (state) => {
      return [...state].sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    },
    reversePosts: (state) => {
      return [...state].reverse();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const { filterPosts, sortPostsById, sortPostsByTitle, reversePosts } = postsSlice.actions;

export default postsSlice.reducer;
