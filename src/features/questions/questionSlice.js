import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addQuestionThunk = createAsyncThunk(
  'questions/addQuestionThunk',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3030/questions/',
        data
      );
      // eslint-disable-next-line no-use-before-define
      return thunkAPI.dispatch(addQuestion(response.data.question));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.error = action.payload;
  state.loading = false;
};

const setLoading = (state) => {
  state.loading = true;
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    loading: false,
    error: '',
  },
  reducers: {
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
      state.error = '';
      state.loading = false;
    },
    resetStatus: (state) => {
      state.status = '';
      state.error = '';
    },
  },
  extraReducers: {
    [addQuestionThunk.pending]: setLoading,
    [addQuestionThunk.rejected]: setError,
  },
});

export const { addQuestion, resetStatus } = questionsSlice.actions;

export const selectErrorQuestion = (state) => state.questions.error;
export const selectLoadingQuestion = (state) => state.questions.loading;

export default questionsSlice.reducer;
