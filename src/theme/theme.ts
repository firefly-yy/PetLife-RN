import { extendTheme } from 'native-base';
const themeColors = {
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#00CFFF', // 主题色
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
  // 根据需要添加其他颜色
};

const theme = extendTheme({
  colors: themeColors,
});
