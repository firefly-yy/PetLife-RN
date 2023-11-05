import React from 'react';
import {View, StyleSheet} from 'react-native';
import IconButton from '../components/IconButton';
import {IconProps} from 'react-native-elements';

// Tab项的类型定义
interface TabItem {
  iconProps: IconProps;
  onPress: () => void;
}

interface BottomNavigationProps {
  tabs: TabItem[];
}

// BottomNavigation 组件
const BottomNavigation: React.FC<BottomNavigationProps> = ({tabs}) => {
  return (
    <View style={styles.tabBar}>
      {tabs.map((tab, index) => (
        <IconButton
          key={index}
          iconProps={tab.iconProps}
          onPress={tab.onPress}
        />
      ))}
    </View>
  );
};

// 获取设备屏幕宽度
// const {width} = Dimensions.get('window');

// 组件的样式
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFF', // Consider using a color that matches your pet platform theme
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    shadowColor: '#000', // Adding some shadow for elevation effect
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10, // Elevation for Android
  },
});

export default BottomNavigation;
