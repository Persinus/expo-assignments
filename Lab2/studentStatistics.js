const class1 = [
    {
      mssv: 'PS0000',
      name: 'Nguyen Van A',
      avgPoint: 8.0, // Điểm trung bình
      avgTrainingPoint: 7, // Điểm rèn luyện trung bình
      status: 'pass', // Trạng thái sinh viên
    },
    {
      mssv: 'PS0001',
      name: 'Nguyen Van B',
      avgPoint: 4.9,
      avgTrainingPoint: 10,
      status: 'pass',
    },
  ];
  
  const class2 = [
    {
      mssv: 'PS0002',
      name: 'Nguyen Van C',
      avgPoint: 4.9,
      avgTrainingPoint: 10,
      status: 'failed',
    },
    {
      mssv: 'PS0003',
      name: 'Nguyen Van D',
      avgPoint: 10,
      avgTrainingPoint: 10,
      status: 'pass',
    },
    {
      mssv: 'PS0004',
      name: 'Nguyen Van E',
      avgPoint: 10,
      avgTrainingPoint: 2,
      status: 'pass',
    },
  ];
  
  // Xử lý dữ liệu sinh viên
  const allStudents = [...class1, ...class2]; // Gộp dữ liệu từ hai lớp
  
  // Lọc ra sinh viên có trạng thái 'pass'
  const filteredStudents = allStudents.filter(student => student.status === 'pass');
  
  // Sắp xếp theo điểm trung bình giảm dần
  const sortedByAvgPoint = [...filteredStudents].sort((a, b) => b.avgPoint - a.avgPoint);
  
  // Sắp xếp theo điểm rèn luyện giảm dần
  const sortedByTrainingPoint = [...filteredStudents].sort((a, b) => b.avgTrainingPoint - a.avgTrainingPoint);
  
  // Lấy top 10 sinh viên có điểm trung bình cao nhất
  const top10ByAvgPoint = sortedByAvgPoint.slice(0, 10);
  
  // Lấy top 10 sinh viên có điểm rèn luyện cao nhất
  const top10ByTrainingPoint = sortedByTrainingPoint.slice(0, 10);
  
  export { top10ByAvgPoint, top10ByTrainingPoint }; // Xuất dữ liệu để sử dụng trong App.js
  