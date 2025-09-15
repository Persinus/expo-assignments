import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';

const fruits = [
  { name: 'Apple', image: 'https://i.pinimg.com/474x/3f/a2/87/3fa287c717ff7a7102e6d872c68b5bda.jpg' },
  { name: 'Banana', image: 'https://i.pinimg.com/474x/f2/a1/e1/f2a1e1aafe3e8460f2ae64235f30654c.jpg' },
  { name: 'Orange', image: 'https://i.pinimg.com/474x/96/aa/79/96aa79561f58d1d59400fec3f99f9ad2.jpg' },
  { name: 'Mango', image: 'https://i.pinimg.com/474x/a3/67/65/a36765492b69408b308ec68485f7a03b.jpg' },
  { name: 'Pineapple', image: 'https://i.pinimg.com/474x/a5/9a/d7/a59ad7362fe440248c7a7f87a557f28b.jpg' },
  { name: 'Grapes', image: 'https://i.pinimg.com/474x/1c/51/d8/1c51d8a670048de403fae767394fefa3.jpg' },
  { name: 'Strawberry', image: 'https://i.pinimg.com/474x/a3/fe/f3/a3fef33686f8b03114da872ade386f53.jpg' },
  { name: 'Blueberry', image: 'https://i.pinimg.com/474x/c9/c7/fc/c9c7fca311b4daa4e0568ee6714172d9.jpg' },
];

const FruitSelector = () => {
  const [query, setQuery] = useState('');
  const [filteredFruits, setFilteredFruits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length === 0) {
      setFilteredFruits([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      const results = fruits.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFruits(results);
      setShowSuggestions(true);
      setLoading(false);
    }, 300); // Debounce 300ms

    return () => clearTimeout(timeout);
  }, [query]);

  // Thêm item rỗng nếu danh sách có số phần tử lẻ
  const adjustedFruits = [...(query ? filteredFruits : fruits)];
  if (adjustedFruits.length % 2 !== 0) {
    adjustedFruits.push({ name: '', image: '' });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fruit Selector</Text>

      {/* Autocomplete Input */}
      <View style={styles.autocompleteContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a fruit..."
          value={query}
          onChangeText={setQuery}
          onFocus={() => setShowSuggestions(true)}
        />

        {loading && <ActivityIndicator size="small" color="#0000ff" style={styles.spinner} />}

        {/* Gợi ý tìm kiếm */}
        {showSuggestions && filteredFruits.length > 0 && (
          <View style={styles.suggestions}>
            {filteredFruits.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => {
                  setQuery(item.name);
                  setShowSuggestions(false);
                }}
              >
                <Text style={styles.suggestionText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Danh sách trái cây */}
      <FlatList
        data={adjustedFruits}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          item.name ? (
            <View style={styles.gridItem}>
              <Image source={{ uri: item.image }} style={styles.fruitImage} />
              <Text style={styles.item}>{item.name}</Text>
            </View>
          ) : (
            <View style={styles.gridItemEmpty} /> // Ô trống để giữ bố cục
          )
        )}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e6e6fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  autocompleteContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  spinner: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  suggestions: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    zIndex: 10,
    maxHeight: 150,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  suggestionText: {
    fontSize: 16,
  },
  gridItem: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  gridItemEmpty: {
    flex: 1, // Giữ nguyên kích thước nhưng không hiển thị nội dung
    margin: 5,
    padding: 10,
    backgroundColor: 'transparent',
  },
  fruitImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
});

export default FruitSelector;
