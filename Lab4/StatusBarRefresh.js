import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const StatusBarRefresh = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [statusBarColor, setStatusBarColor] = useState('#3498db'); // Màu ban đầu

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setStatusBarColor((prevColor) =>
        prevColor === '#3498db' ? '#ff2400' : '#3498db'
      ); // Đổi màu StatusBar
    }, 1500);
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor={statusBarColor} barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.card}>
          <Icon name="sync-alt" size={50} color="#2c3e50" />
          <Text style={styles.header}>Kéo xuống để làm mới</Text>
          <Text style={styles.paragraph}>
            Khi làm mới, màu của thanh trạng thái sẽ thay đổi tự động.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#e6e6fa', // Nền sáng hơn
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495e',
    marginTop: 15,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});

export default StatusBarRefresh;
