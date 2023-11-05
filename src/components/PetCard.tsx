import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import SwipeableImage from '../features/SwipeableImage';
import { theme } from '../theme/theme';

interface PetCardProps {
  title: string;
  location: string;
  imagesUrl: string[];
  price: string;
  onPress: () => void;
}

const PetCard: React.FC<PetCardProps> = ({ title, location, imagesUrl, price, onPress }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={onPress} // 设置点击事件处理函数
      >
        <SwipeableImage imagesUrl={imagesUrl} dotColor={theme.colors.dot} />
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.location}>{location}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const CARD_MARGIN = 10;
const CARD_BORDER_RADIUS = 15;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  card: {
    borderRadius: CARD_BORDER_RADIUS,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginVertical: CARD_MARGIN,
    marginHorizontal: CARD_MARGIN / 2,
    width: width - 2 * CARD_MARGIN, // Ensure card width is responsive to screen width
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
  location: {
    fontSize: 14,
    color: '#666', // Softened color for a less obtrusive look
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
    fontWeight: 'bold',
  },
});

export default PetCard;
