import { useState } from 'react';
import { Button, Modal, List, Input, Form, Space } from 'antd';
import { EnvironmentOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useLocation } from '../context/LocationContext';

const LocationSelector = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [addMode, setAddMode] = useState(false);
  const [form] = Form.useForm();
  const { selectedLocation, setSelectedLocation, locations, setLocations } = useLocation();

  const handleLocationChange = (location: { id: string; name: string }) => {
    setSelectedLocation(location);
    setModalOpen(false);
    setSearchTerm('');
  };

  const handleAddLocation = (values: any) => {
    const newLocation = {
      id: Date.now().toString(),
      name: values.newLocationName
    };
    setLocations([...locations, newLocation]);
    setSelectedLocation(newLocation);
    setAddMode(false);
    setModalOpen(false);
    form.resetFields();
    setSearchTerm('');
  };

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Button
        type="text"
        icon={<EnvironmentOutlined />}
        onClick={() => setModalOpen(true)}
        style={{
          width: '100%',
          textAlign: 'left',
          height: 'auto',
          padding: '12px 16px',
          marginBottom: 16
        }}
      >
        <div style={{ marginLeft: 8 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Local Actual</div>
          <div style={{ fontWeight: 500 }}>{selectedLocation.name}</div>
        </div>
      </Button>

      <Modal
        title="Seleccionar Local"
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setSearchTerm('');
          setAddMode(false);
          form.resetFields();
        }}
        footer={null}
      >
        {!addMode ? (
          <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <Input
                placeholder="Buscar local..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setAddMode(true)}
                title="Agregar nuevo local"
              />
            </div>
            <List
              dataSource={filteredLocations}
              renderItem={(location) => (
                <List.Item
                  onClick={() => handleLocationChange(location)}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  className="location-list-item"
                >
                  <List.Item.Meta
                    avatar={<EnvironmentOutlined />}
                    title={location.name}
                  />
                </List.Item>
              )}
            />
          </>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddLocation}
          >
            <Form.Item
              name="newLocationName"
              label="Nombre del Local"
              rules={[{ required: true, message: 'Por favor ingrese el nombre del local' }]}
            >
              <Input placeholder="Ej: Local Centro, Sucursal Norte..." />
            </Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Crear Local
              </Button>
              <Button onClick={() => {
                setAddMode(false);
                form.resetFields();
              }}>
                Cancelar
              </Button>
            </Space>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default LocationSelector;
