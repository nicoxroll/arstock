import { useState } from 'react';
import { Card, Row, Col, Statistic, Typography, Tag, Breadcrumb, Button, Modal, Form, Input, Space } from 'antd';
import { DollarOutlined, RiseOutlined, InboxOutlined, PlusOutlined, EditOutlined, DeleteOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer } from 'recharts';
import { useLocation } from '../context/LocationContext';

const { Title, Text } = Typography;

interface Admin {
  id: string;
  name: string;
}

// Mapa de locales con sus imágenes hero
const LOCAL_HEROES: Record<string, string> = {
  'local1': 'https://images.pexels.com/photos/5709665/pexels-photo-5709665.jpeg',
  'local2': 'https://www.pexels.com/es-es/foto/persona-sosteniendo-camisa-blanca-5418927/',
  'local3': 'https://images.pexels.com/photos/4622413/pexels-photo-4622413.jpeg',
};

const Overview = () => {
  const { selectedLocation } = useLocation();
  const [admins, setAdmins] = useState<Admin[]>([
    { id: '1', name: 'Juan Pérez' },
    { id: '2', name: 'María García' },
    { id: '3', name: 'Carlos López' },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();

  // Obtener la imagen hero del local actual (usa la primera del mapa si no existe)
  const heroImage = LOCAL_HEROES[selectedLocation.id] || Object.values(LOCAL_HEROES)[0];

  const handleAddAdmin = () => {
    setEditingId(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEditAdmin = (admin: Admin) => {
    setEditingId(admin.id);
    form.setFieldsValue({ name: admin.name });
    setModalOpen(true);
  };

  const handleDeleteAdmin = (id: string) => {
    setAdmins(admins.filter(admin => admin.id !== id));
  };

  const handleSaveAdmin = (values: { name: string }) => {
    if (editingId) {
      setAdmins(admins.map(admin =>
        admin.id === editingId ? { ...admin, name: values.name } : admin
      ));
    } else {
      setAdmins([...admins, { id: Date.now().toString(), name: values.name }]);
    }
    setModalOpen(false);
    form.resetFields();
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>Panel</Breadcrumb.Item>
        <Breadcrumb.Item>Resumen</Breadcrumb.Item>
      </Breadcrumb>

      {/* Hero Banner */}
      <div 
        style={{
          position: 'relative',
          height: 300,
          borderRadius: 8,
          overflow: 'hidden',
          marginBottom: 24,
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'slideInUp 0.5s ease',
          zIndex: 0,
        }}
      >
        {/* Overlay oscuro */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: 24,
          zIndex: 1,
        }}>
          <div>
            <Title level={2} style={{ 
              color: '#ffffff',
              margin: 0,
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              animation: 'slideInLeft 0.6s ease 0.1s backwards'
            }}>
              Bienvenido a {selectedLocation.name}
            </Title>
            <Text style={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: 14,
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
              animation: 'slideInLeft 0.6s ease 0.2s backwards'
            }}>
              Tu centro de gestión de ventas y stock
            </Text>
          </div>
        </div>
      </div>

      <Title level={3} style={{ animation: 'slideInLeft 0.4s ease 0.3s backwards', marginBottom: 16 }}>
        Resumen del Local
      </Title>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={8} style={{ animation: 'slideInUp 0.4s ease 0.4s backwards' }}>
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
        <Col xs={24} sm={8} style={{ animation: 'slideInUp 0.4s ease 0.5s backwards' }}>
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
        <Col xs={24} sm={8} style={{ animation: 'slideInUp 0.4s ease 0.6s backwards' }}>
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

      <Title level={3} style={{ animation: 'slideInLeft 0.4s ease 0.7s backwards', marginTop: 32, marginBottom: 16 }}>
        Gráficos Rápidos
      </Title>

      <Row gutter={[16, 16]}>
        {/* Pie Chart - Ventas por Categoría */}
        <Col xs={24} md={8} style={{ animation: 'slideInUp 0.4s ease 0.7s backwards' }}>
          <Card title="Ventas por Categoría" size="small">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Laptops', value: 35 },
                    { name: 'Periféricos', value: 25 },
                    { name: 'Monitores', value: 20 },
                    { name: 'Cables', value: 12 },
                    { name: 'Otros', value: 8 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  <Cell fill="#8884d8" />
                  <Cell fill="#82ca9d" />
                  <Cell fill="#ffc658" />
                  <Cell fill="#ff7c7c" />
                  <Cell fill="#8dd1e1" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ marginTop: 8, textAlign: 'center' }}>
              <Button type="link" size="small" icon={<ArrowRightOutlined />}>
                Ver detalles
              </Button>
            </div>
          </Card>
        </Col>

        {/* Bar Chart - Stock por Tipo */}
        <Col xs={24} md={8} style={{ animation: 'slideInUp 0.4s ease 0.75s backwards' }}>
          <Card title="Stock por Tipo" size="small">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { name: 'Laptops', stock: 45 },
                { name: 'Mouses', stock: 120 },
                { name: 'Teclados', stock: 8 },
                { name: 'Monitores', stock: 2 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="stock" fill="#1890ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ marginTop: 8, textAlign: 'center' }}>
              <Button type="link" size="small" icon={<ArrowRightOutlined />}>
                Ver detalles
              </Button>
            </div>
          </Card>
        </Col>

        {/* Line Chart - Ventas Últimos 6 Meses */}
        <Col xs={24} md={8} style={{ animation: 'slideInUp 0.4s ease 0.8s backwards' }}>
          <Card title="Ventas Últimos Meses" size="small">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={[
                { mes: 'Jun', ventas: 45000, ganancia: 15000 },
                { mes: 'Jul', ventas: 52000, ganancia: 18000 },
                { mes: 'Ago', ventas: 48000, ganancia: 16000 },
                { mes: 'Sep', ventas: 61000, ganancia: 21000 },
                { mes: 'Oct', ventas: 55000, ganancia: 19000 },
                { mes: 'Nov', ventas: 125000, ganancia: 45000 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="ventas" stroke="#1890ff" isAnimationActive={true} animationDuration={800} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ marginTop: 8, textAlign: 'center' }}>
              <Button type="link" size="small" icon={<ArrowRightOutlined />}>
                Ver detalles
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      <Title level={3} style={{ animation: 'slideInLeft 0.4s ease 0.85s backwards', marginTop: 32, marginBottom: 16 }}>
        Administración
      </Title>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} style={{ animation: 'slideInUp 0.4s ease 0.9s backwards' }}>
          <Card
            title="Administradores del Local"
            extra={
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddAdmin}>
                Agregar
              </Button>
            }
          >
            <Text type="secondary">Personal con acceso administrativo:</Text>
            <div style={{ marginTop: 12 }}>
              {admins.map((admin) => (
                <div
                  key={admin.id}
                  style={{
                    marginBottom: 8,
                    padding: 8,
                    border: '1px solid #f0f0f0',
                    borderRadius: 4,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    animation: 'fadeIn 0.3s ease',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(24, 144, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <Tag color="blue">{admin.name}</Tag>
                  <Space>
                    <Button
                      type="text"
                      size="small"
                      icon={<EditOutlined />}
                      onClick={() => handleEditAdmin(admin)}
                      style={{ transition: 'all 0.2s ease' }}
                    />
                    <Button
                      type="text"
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteAdmin(admin.id)}
                      style={{ transition: 'all 0.2s ease' }}
                    />
                  </Space>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Modal
        title={editingId ? 'Editar Administrador' : 'Agregar Administrador'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        style={{ animation: 'fadeIn 0.3s ease' }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveAdmin}
        >
          <Form.Item
            name="name"
            label="Nombre del Administrador"
            rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Overview;
