import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
  Animated,
} from 'react-native';

const {width} = Dimensions.get('window');

interface SwipeableImageProps {
  imagesUrl: string[];
}

const SwipeableImage: React.FC<SwipeableImageProps> = ({imagesUrl}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useRef(
    (info: {viewableItems: Array<{index: number}>}) => {
      if (info.viewableItems.length > 0) {
        setCurrentImageIndex(info.viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const renderImage = ({item}: {item: string}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsFullScreen(true);
        }}>
        <Image source={{uri: item}} style={styles.image} />
      </TouchableOpacity>
    );
  };

  const renderIndicator = (index: number) => {
    return (
      <View
        key={index}
        style={[
          styles.dot,
          {
            opacity: index === currentImageIndex ? 1 : 0.5,
          },
        ]}
      />
    );
  };

  const FullScreenImage = () => (
    <Modal
      visible={isFullScreen}
      transparent={false}
      animationType="slide"
      onRequestClose={() => setIsFullScreen(false)}>
      <TouchableOpacity
        style={styles.fullScreenContainer}
        onPress={() => setIsFullScreen(false)}>
        <Image
          source={{uri: imagesUrl[currentImageIndex]}}
          style={styles.fullScreenImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View>
      <FlatList
        data={imagesUrl}
        horizontal
        pagingEnabled
        renderItem={renderImage}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <View style={styles.indicatorContainer}>
        {imagesUrl.map((_, index) => renderIndicator(index))}
      </View>
      {isFullScreen && <FullScreenImage />}
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
    paddingVertical: 8,
  },
  dot: {
    height: 8, // 调整为合适的大小
    width: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF', // 高对比度的颜色
    marginHorizontal: 4,
    borderWidth: 1, // 细边框
    borderColor: '#CCCCCC', // 边框颜色，根据需要调整
  },
});

export default SwipeableImage;
