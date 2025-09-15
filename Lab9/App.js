import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Bai1Stack from './Bai1stack';
import PostsScreen from './post';
import Bai3Stack from './bai3stack'; 
import Bai4Screen from './Bai4/Bai4Screen'; 

const Tab = createBottomTabNavigator();

// App với 4 Tab: Home, Posts, Bai3 (Bạn bè), Bai4 (Đếm ngược)
export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#FF5722', // Màu cho tab đang được chọn (Cam sáng)
                    tabBarInactiveTintColor: '#9E9E9E', // Màu cho tab không được chọn (Xám nhạt)
                    tabBarStyle: {
                        backgroundColor: '#6666FF', // Màu nền của thanh tab (Xám đậm)
                        borderTopWidth: 1,
                        borderTopColor: '#37474F', // Màu viền trên cùng của thanh tab (Xám trung)
                        height: 60, // Chiều cao của thanh tab
                    },
                    tabBarLabelStyle: {
                        fontSize: 14, // Cỡ chữ nhãn tab
                        fontWeight: 'bold', // Chữ đậm
                    },
                }}
            >
                <Tab.Screen 
                    name="Home" 
                    component={Bai1Stack} 
                    options={{ 
                        title: 'Home',
                        tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />
                    }} 
                />
                <Tab.Screen 
                    name="Posts" 
                    component={PostsScreen} 
                    options={{ 
                        title: 'Danh sách bài viết',
                        tabBarIcon: ({ color }) => <Icon name="article" size={24} color={color} />
                    }} 
                />
                <Tab.Screen 
                    name="Bai3" 
                    component={Bai3Stack} 
                    options={{ 
                        title: 'Bạn bè', 
                        tabBarIcon: ({ color }) => <Icon name="people" size={24} color={color} />
                    }} 
                />
                <Tab.Screen 
                    name="Bai4" 
                    component={Bai4Screen} 
                    options={{ 
                        title: 'Đếm ngược', 
                        tabBarIcon: ({ color }) => <Icon name="timer" size={24} color={color} />
                    }} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}