import type { ThemeConfig } from 'antd';

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 2,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Layout: {
      colorBgHeader: '#ffffff',
      colorBgBody: '#f5f5f5',
      siderBg: '#ffffff',
    },
  },
};

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 2,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Layout: {
      colorBgHeader: '#141414',
      colorBgBody: '#0a0a0a',
      siderBg: '#000000',
    },
    Menu: {
      colorBgElevated: '#000000',
      colorItemBg: '#000000',
    },
  },
};

