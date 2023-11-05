import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacityProps,
} from 'react-native';
import {Icon, IconProps} from '@rneui/themed';

// 定义 IconButton 的 props 类型
interface IconButtonProps extends TouchableOpacityProps {
  iconProps: IconProps;
  onPress: (event: GestureResponderEvent) => void;
}

// IconButton 组件
const IconButton: React.FC<IconButtonProps> = ({iconProps, style, onPress}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Icon {...iconProps} />
    </TouchableOpacity>
  );
};

// 组件的样式
const styles = StyleSheet.create({
  button: {
    padding: 10, // 或者根据您的布局需求自定义
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconButton;
