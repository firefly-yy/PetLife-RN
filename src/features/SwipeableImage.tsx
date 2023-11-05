import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  ViewToken,
} from 'react-native';

const { width } = Dimensions.get('window');

interface SwipeableImageProps {
  imagesUrl: string[];
  dotColor?: string;
}

const SwipeableImage: React.FC<SwipeableImageProps> = ({ imagesUrl, dotColor = '#FF6347' }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentImageIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const renderImage = ({ item }: { item: string }) => {
    return (
      // activeOpacity={1} 禁用点击透明度变化
      <TouchableOpacity onPress={() => {}} activeOpacity={1}>
        <Image source={{ uri: item }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  const renderIndicator = (index: number) => {
    // Animated.View替代了普通的View以获得动画效果
    const opacity = scrollX.interpolate({
      inputRange: [(index - 1) * width, index * width, (index + 1) * width],
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View // 使用Animated.View
        key={index}
        style={[
          styles.dot,
          { opacity }, // 动态设置透明度
          { backgroundColor: dotColor }, // 动态设置背景色
        ]}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={imagesUrl}
        horizontal
        pagingEnabled={true} // 开启分页效果
        renderItem={renderImage}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        // 添加getItemLayout提高性能
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      <View style={styles.indicatorContainer}>
        {imagesUrl.map((_, index) => renderIndicator(index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width,
    height: 200,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
});

export default SwipeableImage;
