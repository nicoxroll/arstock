import { useState } from 'react';
import { Card, Form, Input, Select, Button, Space, Avatar, Tag, Divider, Typography, Row, Col, Table } from 'antd';
import { UserOutlined, SaveOutlined, EditOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useLocation } from '../context/LocationContext';

const { Title, Paragraph, Text } = Typography;

interface UserProfile {
  nombre: string;
  email: string;
  rol: 'admin' | 'invitado';
  telefono: string;
  departamento: string;
  fechaRegistro: string;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const { locations } = useLocation();
  const [profile, setProfile] = useState<UserProfile>({
    nombre: 'Juan Pérez',
    email: 'juan.perez@arstock.com',
    rol: 'admin',
    telefono: '+54 11 2345-6789',
    departamento: 'Gerencia',
    fechaRegistro: '2024-01-15',
  });

  const handleEdit = () => {
    form.setFieldsValue(profile);
    setIsEditing(true);
  };

  const handleSave = (values: any) => {
    setProfile(values);
    setIsEditing(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const getRoleColor = (rol: string) => {
    return rol === 'admin' ? 'red' : 'blue';
  };

  const getRoleLabel = (rol: string) => {
    return rol === 'admin' ? 'Administrador' : 'Invitado';
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ marginBottom: 32, animation: 'slideInLeft 0.4s ease' }}>
        <Title level={2} style={{ margin: 0 }}>Mi Perfil</Title>
        <Paragraph style={{ animation: 'slideInLeft 0.4s ease 0.1s backwards' }}>
          Gestiona tu información personal y preferencias de cuenta.
        </Paragraph>
      </div>

      {!isEditing ? (
        <>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card 
                style={{ 
                  textAlign: 'center',
                  animation: 'slideInUp 0.4s ease 0.1s backwards'
                }}
              >
                <Avatar 
                  size={120} 
                  icon={<UserOutlined />}
                  style={{
                    backgroundColor: '#1890ff',
                    marginBottom: 16,
                    animation: 'scaleIn 0.4s ease 0.2s backwards'
                  }}
                />
                <Title level={4} style={{ margin: '8px 0' }}>{profile.nombre}</Title>
                <Tag color={getRoleColor(profile.rol)} style={{ marginBottom: 16 }}>
                  {getRoleLabel(profile.rol)}
                </Tag>
                <Divider />
                <Text type="secondary">Email:</Text>
                <Paragraph copyable style={{ fontSize: 12 }}>{profile.email}</Paragraph>
                <Text type="secondary">Teléfono:</Text>
                <Paragraph style={{ fontSize: 12 }}>{profile.telefono}</Paragraph>
                <Text type="secondary">Registrado:</Text>
                <Paragraph style={{ fontSize: 12 }}>
                  {new Date(profile.fechaRegistro).toLocaleDateString('es-AR')}
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} md={16}>
              <Card 
                title="Información de Cuenta"
                style={{ animation: 'slideInUp 0.4s ease 0.2s backwards' }}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24}>
                    <div style={{ padding: '12px 0' }}>
                      <Text strong>Nombre Completo:</Text>
                      <Paragraph style={{ marginTop: 4 }}>{profile.nombre}</Paragraph>
                    </div>
                  </Col>
                  <Col xs={24}>
                    <div style={{ padding: '12px 0' }}>
                      <Text strong>Email:</Text>
                      <Paragraph style={{ marginTop: 4 }}>{profile.email}</Paragraph>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div style={{ padding: '12px 0' }}>
                      <Text strong>Teléfono:</Text>
                      <Paragraph style={{ marginTop: 4 }}>{profile.telefono}</Paragraph>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div style={{ padding: '12px 0' }}>
                      <Text strong>Rol:</Text>
                      <Paragraph style={{ marginTop: 4 }}>
                        <Tag color={getRoleColor(profile.rol)}>
                          {getRoleLabel(profile.rol)}
                        </Tag>
                      </Paragraph>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div style={{ padding: '12px 0' }}>
                      <Text strong>Departamento:</Text>
                      <Paragraph style={{ marginTop: 4 }}>{profile.departamento}</Paragraph>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div style={{ padding: '12px 0' }}>
                      <Text strong>Fecha de Registro:</Text>
                      <Paragraph style={{ marginTop: 4 }}>
                        {new Date(profile.fechaRegistro).toLocaleDateString('es-AR')}
                      </Paragraph>
                    </div>
                  </Col>
                </Row>

                <Divider />

                <Button 
                  type="primary" 
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                  style={{ animation: 'slideInUp 0.4s ease 0.3s backwards' }}
                >
                  Editar Información
                </Button>
              </Card>
            </Col>
          </Row>

          <Divider style={{ margin: '32px 0' }} />

          <Title level={3} style={{ marginBottom: 16, animation: 'slideInLeft 0.4s ease 0.4s backwards' }}>
            Locales Asociados
          </Title>

          <Row gutter={[16, 16]}>
            {locations.map((location, index) => (
              <Col xs={24} sm={12} md={8} key={location.id} style={{ animation: `slideInUp 0.4s ease ${0.4 + index * 0.05}s backwards` }}>
                <Card
                  hoverable
                  style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <EnvironmentOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 8 }} />
                  <Title level={4} style={{ margin: '8px 0' }}>{location.name}</Title>
                  <Text type="secondary">ID: {location.id}</Text>
                  <Divider style={{ margin: '8px 0' }} />
                  <Tag color="blue">Acceso Principal</Tag>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <Card 
          title="Editar Perfil"
          style={{ animation: 'slideInUp 0.4s ease 0.2s backwards' }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
          >
            <Form.Item
              name="nombre"
              label="Nombre Completo"
              rules={[{ required: true, message: 'Por favor ingrese su nombre' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Por favor ingrese su email' },
                { type: 'email', message: 'Email inválido' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="telefono"
              label="Teléfono"
              rules={[{ required: true, message: 'Por favor ingrese su teléfono' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="departamento"
              label="Departamento"
              rules={[{ required: true, message: 'Por favor ingrese su departamento' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="rol"
              label="Rol"
              rules={[{ required: true, message: 'Por favor seleccione un rol' }]}
            >
              <Select
                options={[
                  { label: 'Administrador', value: 'admin' },
                  { label: 'Invitado', value: 'invitado' },
                ]}
                disabled={true}
              />
            </Form.Item>

            <Form.Item
              name="fechaRegistro"
              label="Fecha de Registro"
            >
              <Input disabled />
            </Form.Item>

            <Space>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Guardar Cambios
              </Button>
              <Button onClick={handleCancel}>
                Cancelar
              </Button>
            </Space>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default Profile;
