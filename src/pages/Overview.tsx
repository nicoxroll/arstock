import { Card, Row, Col, Statistic, Typography, Tag, Breadcrumb } from 'antd';
import { DollarOutlined, RiseOutlined, InboxOutlined } from '@ant-design/icons';
import { useLocation } from '../context/LocationContext';

const { Title, Text } = Typography;

const Overview = () => {
  const { selectedLocation } = useLocation();

  const admins = ['Juan Pérez', 'María García', 'Carlos López'];

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Overview</Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2}>Overview - {selectedLocation.name}</Title>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Ventas del Mes"
              value={125000}
              prefix={<DollarOutlined />}
              suffix="ARS"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Ganancias Netas"
              value={45000}
              prefix={<RiseOutlined />}
              suffix="ARS"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Stock Disponible"
              value={1234}
              prefix={<InboxOutlined />}
              suffix="unidades"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24}>
          <Card title="Administradores del Local">
            <Text type="secondary">Personal con acceso administrativo:</Text>
            <div style={{ marginTop: 12 }}>
              {admins.map((admin, index) => (
                <Tag key={index} color="blue" style={{ marginBottom: 8 }}>
                  {admin}
                </Tag>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
