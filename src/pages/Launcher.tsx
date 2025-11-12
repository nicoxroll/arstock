import { Card, Row, Col, Typography, Breadcrumb } from 'antd';
import {
  DashboardOutlined,
  InboxOutlined,
  FileTextOutlined,
  CreditCardOutlined,
  TeamOutlined,
  BarChartOutlined,
  UserOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

interface LauncherItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

interface LauncherProps {
  onNavigate: (key: string) => void;
}

const Launcher = ({ onNavigate }: LauncherProps) => {
  const launcherItems: LauncherItem[] = [
    { key: '1', label: 'Resumen', icon: <DashboardOutlined />, color: '#1890ff', onClick: () => onNavigate('1') },
    { key: '2', label: 'Inventario', icon: <InboxOutlined />, color: '#52c41a', onClick: () => onNavigate('2') },
    { key: '3', label: 'Facturación', icon: <FileTextOutlined />, color: '#faad14', onClick: () => onNavigate('3') },
    { key: '4', label: 'Deudas', icon: <CreditCardOutlined />, color: '#f5222d', onClick: () => onNavigate('4') },
    { key: '5', label: 'Proveedores', icon: <TeamOutlined />, color: '#13c2c2', onClick: () => onNavigate('5') },
    { key: '6', label: 'Estadísticas', icon: <BarChartOutlined />, color: '#722ed1', onClick: () => onNavigate('6') },
    { key: '7', label: 'Empleados', icon: <UserOutlined />, color: '#eb2f96', onClick: () => onNavigate('7') },
    { key: '8', label: 'Clientes', icon: <ShoppingOutlined />, color: '#fa8c16', onClick: () => onNavigate('8') },
  ];

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>Panel</Breadcrumb.Item>
        <Breadcrumb.Item>Lanzador</Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2}>Lanzador de Aplicaciones</Title>

      <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
        {launcherItems.map((item) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.key}>
            <Card
              hoverable
              onClick={item.onClick}
              style={{
                textAlign: 'center',
                borderTop: `4px solid ${item.color}`,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
              }}
            >
              <div style={{ 
                fontSize: 40, 
                marginBottom: 16, 
                color: item.color,
                transition: 'all 0.3s ease'
              }}>
                {item.icon}
              </div>
              <Title level={4} style={{ margin: 0, color: item.color, transition: 'all 0.3s ease' }}>
                {item.label}
              </Title>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Launcher;
