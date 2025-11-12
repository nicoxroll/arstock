import { useState } from 'react';
import { Card, Row, Col, Statistic, Typography, Button, Modal, Form, Input, InputNumber, Select, Space } from 'antd';
import { ShoppingOutlined, PercentageOutlined, BarChartOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const { Title, Paragraph } = Typography;

interface Stat {
  id: string;
  label: string;
  value: number;
  type: 'currency' | 'percentage' | 'number';
}

const Stats = () => {
  const [customStats, setCustomStats] = useState<Stat[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleAddStat = () => {
    setEditingId(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEditStat = (stat: Stat) => {
    setEditingId(stat.id);
    form.setFieldsValue({
      label: stat.label,
      value: stat.value,
      type: stat.type,
    });
    setModalOpen(true);
  };

  const handleDeleteStat = (id: string) => {
    setCustomStats(customStats.filter(s => s.id !== id));
  };

  const handleSaveStat = (values: any) => {
    if (editingId) {
      setCustomStats(customStats.map(s =>
        s.id === editingId ? { ...s, ...values } : s
      ));
    } else {
      setCustomStats([...customStats, { id: Date.now().toString(), ...values }]);
    }
    setModalOpen(false);
    form.resetFields();
  };

  // Datos para los gráficos
  const salesByCategory = [
    { name: 'Electrónica', value: 35000 },
    { name: 'Computación', value: 28000 },
    { name: 'Periféricos', value: 18000 },
    { name: 'Accesorios', value: 15000 },
    { name: 'Otros', value: 9000 },
  ];

  const COLORS = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'];

  const monthlySales = [
    { month: 'Ene', ventas: 45000, ganancias: 18000 },
    { month: 'Feb', ventas: 52000, ganancias: 21000 },
    { month: 'Mar', ventas: 48000, ganancias: 19000 },
    { month: 'Abr', ventas: 61000, ganancias: 24000 },
    { month: 'May', ventas: 55000, ganancias: 22000 },
    { month: 'Jun', ventas: 67000, ganancias: 26000 },
  ];

  const testStatistics = [
    { name: 'Prueba 1', exitosas: 95, fallidas: 5 },
    { name: 'Prueba 2', exitosas: 88, fallidas: 12 },
    { name: 'Prueba 3', exitosas: 92, fallidas: 8 },
    { name: 'Prueba 4', exitosas: 97, fallidas: 3 },
  ];

  return (
    <div>
      <Title level={2}>Estadísticas</Title>
      <Paragraph>
        Análisis detallado del rendimiento del local. Métricas clave para la toma de decisiones.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12}>
          <Card style={{ animation: 'slideInUp 0.5s ease' }}>
            <Statistic
              title="Ticket Promedio"
              value={2845}
              prefix={<ShoppingOutlined />}
              suffix="ARS"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card style={{ animation: 'slideInUp 0.5s ease 0.1s backwards' }}>
            <Statistic
              title="Tasa de Conversión"
              value={68.5}
              prefix={<PercentageOutlined />}
              suffix="%"
              precision={1}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card 
            title="Ventas por Categoría"
            style={{ animation: 'slideInUp 0.5s ease 0.2s backwards' }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {salesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            title="Estadísticas de Pruebas"
            style={{ animation: 'slideInUp 0.5s ease 0.3s backwards' }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={testStatistics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="exitosas" fill="#52c41a" radius={[8, 8, 0, 0]} />
                <Bar dataKey="fallidas" fill="#f5222d" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24}>
          <Card 
            title="Ventas Mensuales"
            style={{ animation: 'slideInUp 0.5s ease 0.4s backwards' }}
          >
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="ventas" 
                  stroke="#1890ff" 
                  strokeWidth={2}
                  dot={{ fill: '#1890ff', r: 4 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={true}
                  animationDuration={1000}
                />
                <Line 
                  type="monotone" 
                  dataKey="ganancias" 
                  stroke="#52c41a" 
                  strokeWidth={2}
                  dot={{ fill: '#52c41a', r: 4 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={true}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24}>
          <Card
            title="Métricas Personalizadas"
            extra={
              <Button type="primary" size="small" icon={<PlusOutlined />} onClick={handleAddStat}>
                Agregar Métrica
              </Button>
            }
            style={{ animation: 'slideInUp 0.5s ease 0.5s backwards' }}
          >
            {customStats.length === 0 ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px 20px',
                color: '#999'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <BarChartOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                  <Paragraph type="secondary">No hay métricas personalizadas agregadas</Paragraph>
                </div>
              </div>
            ) : (
              <Row gutter={[16, 16]}>
                {customStats.map((stat) => (
                  <Col xs={24} sm={12} key={stat.id}>
                    <Card
                      size="small"
                      extra={
                        <Space>
                          <Button
                            type="text"
                            size="small"
                            icon={<EditOutlined />}
                            onClick={() => handleEditStat(stat)}
                          />
                          <Button
                            type="text"
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteStat(stat.id)}
                          />
                        </Space>
                      }
                    >
                      <Statistic
                        title={stat.label}
                        value={stat.value}
                        suffix={stat.type === 'currency' ? ' ARS' : stat.type === 'percentage' ? '%' : ''}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Card>
        </Col>
      </Row>

      <Modal
        title={editingId ? 'Editar Métrica' : 'Agregar Métrica'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveStat}
        >
          <Form.Item
            name="label"
            label="Nombre de la Métrica"
            rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="value"
            label="Valor"
            rules={[{ required: true, message: 'Por favor ingrese el valor' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="type"
            label="Tipo"
            rules={[{ required: true, message: 'Por favor seleccione el tipo' }]}
          >
            <Select options={[
              { label: 'Número', value: 'number' },
              { label: 'Moneda', value: 'currency' },
              { label: 'Porcentaje', value: 'percentage' },
            ]} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Stats;
