import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Thư viện biểu tượng
import CheckboxRadioButton from './CheckboxRadioButton'; // Bài Tập 1
import FlatListSectionList from './FlatlistSectionList'; // Bài Tập 2
import ModalExample from './ModalActivityIndicator'; // Bài Tập 3

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Checkbox & RadioButton') {
              iconName = focused ? 'checkbox-outline' : 'checkbox';
            } else if (route.name === 'FlatList & SectionList') {
              iconName = focused ? 'list-circle' : 'list-circle-outline';
            } else if (route.name === 'Modal Example') {
              iconName = focused ? 'albums' : 'albums-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#f39c12', // Màu nổi bật khi được chọn
          tabBarInactiveTintColor: '#ecf0f1', // Màu chữ khi không được chọn
          tabBarStyle: {
            backgroundColor: '#2c3e50', // Màu nền thanh Tab
            borderTopWidth: 0,
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          tabBarIconStyle: {
            transition: 'transform 0.3s', // Hiệu ứng icon
          },
        })}
      >
        <Tab.Screen
          name="Checkbox & RadioButton"
          component={CheckboxRadioButton}
          options={{ title: 'Checkbox & Radio' }}
        />
        <Tab.Screen
          name="FlatList & SectionList"
          component={FlatListSectionList}
          options={{ title: 'Lists & Sections' }}
        />
        <Tab.Screen
          name="Modal Example"
          component={ModalExample}
          options={{ title: 'Modal View' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


