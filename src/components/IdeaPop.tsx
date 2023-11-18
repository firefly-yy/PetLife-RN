import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

interface IdeaPopProps {
  title: string;
  location: string;
  price: string;
  onPress: () => void;
}

const { width } = Dimensions.get('screen');

const IdeaPop: React.FC<IdeaPopProps> = ({ title, location, price, onPress }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={onPress} // 设置点击事件处理函数
      >
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    width: width - 30, // Ensure card width is responsive to screen width
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.05,
    elevation: 3, // for Android
  },
  info: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Slightly darker color for better readability
  },
});

export default IdeaPop;
