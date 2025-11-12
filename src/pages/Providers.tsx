import { useState } from 'react';
import { Table, Typography, Button, Modal, Form, Input, Space, Row, Col, Descriptions } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Providers = () => {
  const [data, setData] = useState([
    { key: '1', nombre: 'Distribuidora Tech', contacto: '+54 11 4567-8901', email: 'ventas@disttech.com', rubro: 'Computación' },
    { key: '2', nombre: 'Importaciones Global', contacto: '+54 11 4567-8902', email: 'info@impglobal.com', rubro: 'Electrónica' },
    { key: '3', nombre: 'Mayorista Central', contacto: '+54 11 4567-8903', email: 'contacto@mayorista.com', rubro: 'General' },
    { key: '4', nombre: 'Electrónica SA', contacto: '+54 11 4567-8904', email: 'ventas@electronicasa.com', rubro: 'Electrónica' },
    { key: '5', nombre: 'Tech Supplies', contacto: '+54 11 4567-8905', email: 'info@techsupplies.com', rubro: 'Accesorios' },
    { key: '6', nombre: 'Periféricos Pro', contacto: '+54 11 4567-8906', email: 'ventas@perifericospro.com', rubro: 'Periféricos' },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();

  const handleAddItem = () => {
    setEditingKey(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleViewItem = (item) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  const handleEditItem = (item) => {
    setEditingKey(item.key);
    form.setFieldsValue({
      nombre: item.nombre,
      contacto: item.contacto,
      email: item.email,
      rubro: item.rubro,
    });
    setModalOpen(true);
  };

  const handleDeleteItem = (key) => {
    Modal.confirm({
      title: '¿Está seguro de eliminar este proveedor?',
      icon: <ExclamationCircleOutlined />,
      content: 'Esta acción no se puede deshacer.',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        setData(data.filter(item => item.key !== key));
      },
    });
  };

  const handleSaveItem = (values) => {
    if (editingKey) {
      setData(data.map(item =>
        item.key === editingKey
          ? { ...item, ...values }
          : item
      ));
    } else {
      setData([...data, { key: Date.now().toString(), ...values }]);
    }
    setModalOpen(false);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Contacto',
      dataIndex: 'contacto',
      key: 'contacto',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rubro',
      dataIndex: 'rubro',
      key: 'rubro',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleEditItem(record);
            }}
          />
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteItem(record.key);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={16}>
          <Title level={2} style={{ margin: 0 }}>Proveedores</Title>
          <Paragraph style={{ margin: 0 }}>
            Directorio completo de proveedores. Acceda a información de contacto y categorías de productos.
          </Paragraph>
        </Col>
        <Col xs={24} sm={8} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAddItem}
          >
            <span className="btn-text">Nuevo Proveedor</span>
          </Button>
        </Col>
      </Row>
      <div className="fade-in-table">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
          onRow={(record) => ({
            onClick: () => handleViewItem(record),
            style: { cursor: 'pointer' }
          })}
        />
      </div>

      <Modal
        title={editingKey ? 'Editar Proveedor' : 'Nuevo Proveedor'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveItem}
        >
          <Form.Item
            name="nombre"
            label="Nombre del Proveedor"
            rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contacto"
            label="Contacto"
            rules={[{ required: true, message: 'Por favor ingrese el contacto' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Por favor ingrese el email' }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="rubro"
            label="Rubro"
            rules={[{ required: true, message: 'Por favor ingrese el rubro' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Detalle de Proveedor"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={[
          <Button 
            key="delete" 
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setViewModalOpen(false);
              handleDeleteItem(selectedItem.key);
            }}
          >
            Eliminar
          </Button>,
          <Button key="close" onClick={() => setViewModalOpen(false)}>
            Cerrar
          </Button>,
          <Button 
            key="edit" 
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setViewModalOpen(false);
              handleEditItem(selectedItem);
            }}
          >
            Editar
          </Button>
        ]}
      >
        {selectedItem && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Nombre">{selectedItem.nombre}</Descriptions.Item>
            <Descriptions.Item label="Contacto">{selectedItem.contacto}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedItem.email}</Descriptions.Item>
            <Descriptions.Item label="Rubro">{selectedItem.rubro}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default Providers;
