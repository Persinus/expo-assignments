// Nhập createSlice từ Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Định nghĩa trạng thái khởi tạo cho slice
const initialState = {
    tasks: [],    // Mảng chứa danh sách công việc
    loading: false, // Trạng thái tải dữ liệu
    error: null,    // Biến lưu thông tin lỗi nếu có
};

// Tạo slice cho tasks
const tasksSlice = createSlice({
    name: 'tasks', // Tên của slice
    initialState,  // Trạng thái khởi tạo
    reducers: {
        // Hành động bắt đầu tải dữ liệu
        fetchTasksStart(state) {
            state.loading = true; // Đặt trạng thái loading thành true
        },
        // Hành động khi tải dữ liệu thành công
        fetchTasksSuccess(state, action) {
            state.loading = false;  // Đặt trạng thái loading thành false
            state.tasks = action.payload; // Lưu dữ liệu vào tasks từ action.payload
        },
        // Hành động khi có lỗi tải dữ liệu
        fetchTasksError(state, action) {
            state.loading = false;  // Đặt trạng thái loading thành false
            state.error = action.payload; // Lưu thông tin lỗi vào error
        },
    },
});

// Xuất các action creators từ slice
export const { fetchTasksStart, fetchTasksSuccess, fetchTasksError } = tasksSlice.actions;

// Gọi API để lấy dữ liệu danh sách công việc từ JSONPlaceholder
export const fetchTasks = () => async (dispatch) => {
    dispatch(fetchTasksStart()); // Bắt đầu tải dữ liệu (thay đổi trạng thái loading)
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos'); // Gọi API
        const data = await response.json(); // Chuyển đổi phản hồi thành JSON
        dispatch(fetchTasksSuccess(data)); // Gửi dữ liệu thành công vào slice
    } catch (error) {
        dispatch(fetchTasksError(error.message)); // Gửi thông tin lỗi vào slice
    }
};

// Xuất reducer để sử dụng trong store
export default tasksSlice.reducer;
