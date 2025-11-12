import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Title, Text, Link } = Typography;

const Login = () => {
  const { login } = useAuth();

  const onFinish = (values: { username: string; password: string }) => {
    login(values.username);
  };

  const handleForgotPassword = () => {
    // Aquí podrías implementar la lógica de recuperación de contraseña
    alert('Funcionalidad de recuperación de contraseña en desarrollo');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Imagen de fondo */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(https://images.pexels.com/photos/5709665/pexels-photo-5709665.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.7)',
        zIndex: 0,
      }} />

      {/* Overlay con blur */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(3px)',
        zIndex: 1,
      }} />

      {/* Card de login con efecto glassmorphism */}
      <Card 
        style={{ 
          width: '100%', 
          maxWidth: 400,
          zIndex: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={2} style={{ marginBottom: 8, color: '#1890ff' }}>Arstock</Title>
          <Text type="secondary">Sistema de Gestión de Inventario</Text>
        </div>
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Por favor ingrese su usuario' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Usuario"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Contraseña"
              size="large"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          
          <Form.Item style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link onClick={handleForgotPassword}>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Ingresar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
