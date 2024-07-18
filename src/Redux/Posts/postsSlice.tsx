import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataItem, AppState } from '../../Components/Home/Home';

const initialState: AppState = {
  loading: false,
  users: [],
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsRequest(state) {
      state.loading = true;
    },
    fetchPostsSuccess(state, action: PayloadAction<DataItem[]>) {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    },
    fetchPostsFailure(state, action: PayloadAction<string | null>) {
      state.loading = false;
      state.users = [];
      state.error = action.payload;
    },
    addNewPost(state, action: PayloadAction<DataItem>) {
      state.users = [action.payload, ...state.users];
    }
  }
});

export const {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  addNewPost
} = postsSlice.actions;

export default postsSlice.reducer;
