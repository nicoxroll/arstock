import { useState } from 'react';
import { Layout, Menu, Avatar, Button, Switch, Typography } from 'antd';
import {
  DashboardOutlined,
  InboxOutlined,
  FileTextOutlined,
  CreditCardOutlined,
  TeamOutlined,
  BarChartOutlined,
  UserOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BulbOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import LocationSelector from './LocationSelector';
import Overview from '../pages/Overview';
import Stock from '../pages/Stock';
import Launcher from '../pages/Launcher';
import Billing from '../pages/Billing';
import Debts from '../pages/Debts';
import Providers from '../pages/Providers';
import Stats from '../pages/Stats';
import Employments from '../pages/Employments';
import Customers from '../pages/Customers';
import Profile from '../pages/Profile';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const { username, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const menuItems = [
    { key: '1', icon: <DashboardOutlined />, label: 'Overview' },
    { key: '9', icon: <AppstoreOutlined />, label: 'Launcher' },
    { key: '2', icon: <InboxOutlined />, label: 'Stock' },
    { key: '3', icon: <FileTextOutlined />, label: 'Billing' },
    { key: '4', icon: <CreditCardOutlined />, label: 'Debts' },
    { key: '5', icon: <TeamOutlined />, label: 'Providers' },
    { key: '6', icon: <BarChartOutlined />, label: 'Stats' },
    { key: '7', icon: <UserOutlined />, label: 'Employments' },
    { key: '8', icon: <ShoppingOutlined />, label: 'Customers' },
    { key: '10', icon: <UserOutlined />, label: 'Perfil' },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case '1': return <Overview />;
      case '9': return <Launcher onNavigate={setSelectedKey} />;
      case '2': return <Stock />;
      case '3': return <Billing />;
      case '4': return <Debts />;
      case '5': return <Providers />;
      case '6': return <Stats />;
      case '7': return <Employments />;
      case '8': return <Customers />;
      case '10': return <Profile />;
      default: return <Overview />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', height: '100vh', overflow: 'hidden' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: isDark ? undefined : '#ffffff',
          transition: 'width 0.2s ease',
        }}
        width={250}
      >
        <div style={{ 
          padding: '16px', 
          textAlign: 'center',
          borderBottom: '1px solid #f0f0f0',
          backgroundColor: isDark ? undefined : '#ffffff',
        }}>
          <Text strong style={{ fontSize: collapsed ? 14 : 18, color: isDark ? undefined : '#000000' }}>
            {collapsed ? 'AS' : 'Arstock'}
          </Text>
        </div>

        {!collapsed && <LocationSelector />}

        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => setSelectedKey(key)}
          style={{ borderRight: 0, backgroundColor: isDark ? undefined : '#ffffff' }}
        />
      </Sider>

      <Layout style={{ 
        marginLeft: collapsed ? 80 : 250, 
        transition: 'margin-left 0.2s ease',
        height: '100vh',
        overflow: 'hidden'
      }}>
        <Header
          style={{
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ 
              fontSize: '16px', 
              width: 44, 
              height: 44,
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <BulbOutlined />
              <Switch checked={isDark} onChange={toggleTheme} />
            </div>
            <Button
              type="text"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: 0,
                height: 'auto',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedKey('10')}
            >
              <Avatar icon={<UserOutlined />} />
              <Text>{username}</Text>
            </Button>
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={logout}
            >
              
            </Button>
          </div>
        </Header>

        <Content style={{ 
          margin: '24px', 
          minHeight: 280,
          overflow: 'auto',
          height: 'calc(100vh - 64px - 48px)',
        }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
