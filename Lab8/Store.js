import { configureStore } from "@reduxjs/toolkit";

// Import reducers của từng phần

import roomsReducer from "./src/RoomSliceBai4"; // Room Booking
import tasksReducer from "./TasksSlice";    // Tasks của Bài 1
  
// Tạo store chung
const store = configureStore({
  reducer: {
   
    rooms: roomsReducer, // Reducer cho quản lý phòng của Booking
    tasks: tasksReducer, // Reducer cho Tasks của Bài 1
   

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
