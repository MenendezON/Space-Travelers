import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  dragons: [],
  status: '',
  error: null,
};

const baseDragonsURL = 'https://api.spacexdata.com/v3/dragons';

export const fetchDragonsAsync = createAsyncThunk(
  'dragons/fetchDragons',
  async () => {
    const response = await axios.get(`${baseDragonsURL}`);
    return response.data;
  },
);

const dragonsSlice = createSlice({
  name: 'dragons',
  initialState,
  reducers: {
    dragonReserved: (state, action) => {
      const { id } = action.payload;
      state.dragons = state.dragons.map((dragon) => {
        if (dragon.id === id) {
          return { ...dragon, reserved: true };
        }
        return dragon;
      });
    },
    dragonCanceled: (state, action) => {
      const { id } = action.payload;
      state.dragons = state.dragons.map((dragon) => {
        if (dragon.id === id) {
          return { ...dragon, reserved: false };
        }
        return dragon;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDragonsAsync.fulfilled, (state, action) => {
        const newDragons = [];
        const keys = Object.keys(action.payload);
        keys.forEach((keyOfActionPayload) => {
          newDragons.push({
            id: keyOfActionPayload,
            ...action.payload[keyOfActionPayload],
          });
        });
        state.dragons = newDragons;
        state.error = '';
      })
      .addCase(fetchDragonsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { dragonReserved, dragonCanceled } = dragonsSlice.actions;

export default dragonsSlice.reducer;
