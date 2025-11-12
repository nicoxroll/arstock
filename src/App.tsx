import { ConfigProvider, theme } from 'antd';
import esES from 'antd/locale/es_ES';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LocationProvider } from './context/LocationContext';
import { lightTheme, darkTheme } from './theme/antd-theme';
import Login from './pages/Login';
import DashboardLayout from './components/DashboardLayout';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const { isDark } = useTheme();

  return (
    <ConfigProvider
      locale={esES}
      theme={{
        ...(isDark ? darkTheme : lightTheme),
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {isAuthenticated ? <DashboardLayout /> : <Login />}
    </ConfigProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LocationProvider>
          <AppContent />
        </LocationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
