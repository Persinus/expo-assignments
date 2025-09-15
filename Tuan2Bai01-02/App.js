import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Text, FlatList, ScrollView, TextInput, Button } from 'react-native';
import { top10ByAvgPoint, top10ByTrainingPoint } from './studentStatistics';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useEventHandlers } from './eventHandlers'; // Import custom hook

// 📌 Component hiển thị danh sách sinh viên
const StudentList = ({ title, data, valueKey }) => (
  <View style={styles.listContainer}>
    <Text style={styles.title}>{title}</Text>
    <FlatList
      data={data}
      keyExtractor={(item) => item.mssv}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.studentName}>{item.name}</Text>
          <Text style={styles.studentInfo}>📌 MSSV: {item.mssv}</Text>
          <Text style={styles.studentScore}>
            {valueKey === 'avgPoint' ? '🎯 Điểm trung bình' : '🔥 Điểm rèn luyện'}: {item[valueKey]}
          </Text>
        </View>
      )}
    />
  </View>
);

// 📌 Bài tập 1: Hiển thị danh sách sinh viên có điểm cao
const Exercise1 = () => (
  <View style={styles.container}>
    <StudentList title="🏆 Top 10 sinh viên có điểm trung bình cao" data={top10ByAvgPoint} valueKey="avgPoint" />
    <StudentList title="💪 Top 10 sinh viên có điểm rèn luyện cao" data={top10ByTrainingPoint} valueKey="avgTrainingPoint" />
  </View>
);

// 📌 Bài tập 2: Xử lý sự kiện trong React Native
const Exercise2 = () => {
  const {
    inputValue,
    textValue,
    handleButtonClick,
    handleTextClick,
    handleInputChange,
    handleTextviewClick,
  } = useEventHandlers(); 

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎯 Xử lý sự kiện trong React Native</Text>

      {/* View */}
      <View style={styles.viewContainer} onTouchEnd={handleTextClick}>
        <Text style={styles.text}>🔵 Nhấn vào đây để xử lý sự kiện View</Text>
      </View>

      {/* Text */}
      <Text style={styles.clickableText} onPress={handleTextClick}>
        🔴 Nhấn vào đây để xử lý sự kiện Text
      </Text>

      {/* TextInput */}
      <Text style={styles.label}>✍️ Nhập nội dung:</Text>
      <TextInput
        style={styles.input}
        placeholder="Gõ gì đó vào đây..."
        value={inputValue}
        onChangeText={handleInputChange}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="🚀 Nhấn vào đây" color="#3498db" onPress={handleButtonClick} />
        <Button title="🔄 Cập nhật TextView" color="#e67e22" onPress={handleTextviewClick} />
      </View>

      {/* Hiển thị textValue */}
      <Text style={styles.resultText}>📌 Kết quả: {textValue}</Text>
    </ScrollView>
  );
};

// 📌 Điều hướng giữa các bài tập với Bottom Tabs
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Bài Tập 1") {
              iconName = "school";
            } else if (route.name === "Bài Tập 2") {
              iconName = "book-open";
            }
            return route.name === "Bài Tập 1" 
              ? <MaterialIcons name={iconName} size={size} color={color} />
              : <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#f1c40f', 
          tabBarInactiveTintColor: '#ecf0f1', 
        })}
      >
        <Tab.Screen name="Bài Tập 1" component={Exercise1} />
        <Tab.Screen name="Bài Tập 2" component={Exercise2} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// 📌 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  listContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#3498db',
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
  },
  studentInfo: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
  },
  studentScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginTop: 5,
  },
  tabBar: {
    backgroundColor: '#2c3e50',
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    overflow: 'hidden',
    paddingBottom: 5,
  },
  viewContainer: {
    backgroundColor: '#dfe6e9',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#636e72',
  },
  text: {
    fontSize: 18,
    color: '#2d3436',
    fontWeight: 'bold',
  },
  clickableText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8e44ad',
    marginBottom: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: '#9b59b6',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: '#fff',
    color: '#2c3e50',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27ae60',
    textAlign: 'center',
    marginTop: 20,
  },
});
