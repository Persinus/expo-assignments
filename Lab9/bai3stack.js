import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddFriend from './src/AddFriend';
import FriendList from './src/FriendList';

const Stack = createStackNavigator();

export default function Bai3Stack() {
    return (
        <Stack.Navigator initialRouteName="FriendList">
            <Stack.Screen 
                name="FriendList" 
                component={FriendList} 
                options={{ 
                    title: 'Danh Sách Bạn Bè',
                    headerStyle: { backgroundColor: '#f4511e' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' }
                }} 
            />
            <Stack.Screen 
                name="AddFriend" 
                component={AddFriend} 
                options={{ 
                    title: 'Thêm Bạn Bè',
                    headerStyle: { backgroundColor: '#f4511e' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' }
                }} 
            />
        </Stack.Navigator>
    );
}