import { useState } from 'react';

export const useEventHandlers = () => {
  const [inputValue, setInputValue] = useState(''); // Trạng thái cho TextInput
  const [textValue, setTextValue] = useState(''); // Trạng thái cho TextView

  const handleButtonClick = () => {
    alert('Button clicked!'); // Hiển thị thông báo khi Button được nhấn
  };

  const handleTextClick = () => {
    alert('Text clicked!'); // Hiển thị thông báo khi Text được nhấn
  };

  const handleInputChange = (text) => {
    setInputValue(text); // Cập nhật giá trị TextInput
  };

  const handleTextviewClick = () => { // ⚠️ Đảm bảo tên hàm trùng khớp
    setTextValue(inputValue); // Cập nhật giá trị cho TextView từ TextInput
  };

  return {
    inputValue,
    textValue,
    handleButtonClick,
    handleTextClick,
    handleInputChange,
    handleTextviewClick, // ✅ Đã sửa lỗi tên biến
  };
};
