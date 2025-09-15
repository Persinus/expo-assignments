import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch rooms from the API
export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://192.168.1.5:3000/rooms");
    return response.data;  // Returning the response data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Unknown error occurred");
  }
});

// Initial state
const initialState = {
  rooms: [],  // List of rooms
  loading: false,  // Loading state
  error: null,  // Error message
};

// Slice to handle rooms data
const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch rooms";
      });
  },
});

// Export the action and reducer
export const { setRooms } = roomSlice.actions;
export default roomSlice.reducer;