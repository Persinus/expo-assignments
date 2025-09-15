import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ContactList from './ContactList';
import AddContact from './AddContact';

const Stack = createStackNavigator();

const ContactStack = () => {
  return (
    <Stack.Navigator initialRouteName="Contacts">
      <Stack.Screen name="Contacts" component={ContactList} />
      <Stack.Screen name="AddContact" component={AddContact} />
    </Stack.Navigator>
  );
};

export default ContactStack;