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

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const handleAddItem = () => {
    setSelectedItem(null);
    setIsEditing(true);
    form.resetFields();
    setViewModalOpen(true);
  };

  const handleViewItem = (item) => {
    setSelectedItem(item);
    setIsEditing(false);
    form.setFieldsValue({
      nombre: item.nombre,
      contacto: item.contacto,
      email: item.email,
      rubro: item.rubro,
    });
    setViewModalOpen(true);
  };

  const handleEditItem = () => {
    setIsEditing(true);
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
        setViewModalOpen(false);
      },
    });
  };

  const handleSaveItem = (values) => {
    if (selectedItem) {
      setData(data.map(item =>
        item.key === selectedItem.key
          ? { ...item, ...values }
          : item
      ));
    } else {
      setData([...data, { key: Date.now().toString(), ...values }]);
    }
    setViewModalOpen(false);
    setSelectedItem(null);
    setIsEditing(false);
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
        title={selectedItem ? (isEditing ? 'Editar Proveedor' : 'Detalle de Proveedor') : 'Agregar Proveedor'}
        open={viewModalOpen}
        onCancel={() => {
          setViewModalOpen(false);
          setSelectedItem(null);
          setIsEditing(false);
          form.resetFields();
        }}
        footer={
          isEditing ? [
            <Button key="cancel" onClick={() => {
              if (selectedItem) {
                setIsEditing(false);
                form.setFieldsValue({
                  nombre: selectedItem.nombre,
                  contacto: selectedItem.contacto,
                  email: selectedItem.email,
                  rubro: selectedItem.rubro,
                });
              } else {
                setViewModalOpen(false);
                form.resetFields();
              }
            }}>
              Cancelar
            </Button>,
            <Button key="save" type="primary" onClick={() => form.submit()}>
              Guardar
            </Button>,
          ] : [
            <Button 
              key="delete" 
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteItem(selectedItem.key)}
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
              onClick={handleEditItem}
            >
              Editar
            </Button>
          ]
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveItem}
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Nombre">
              {isEditing ? (
                <Form.Item
                  name="nombre"
                  rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Input />
                </Form.Item>
              ) : (
                selectedItem?.nombre || '-'
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Contacto">
              {isEditing ? (
                <Form.Item
                  name="contacto"
                  rules={[{ required: true, message: 'Por favor ingrese el contacto' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Input />
                </Form.Item>
              ) : (
                selectedItem?.contacto || '-'
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {isEditing ? (
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Por favor ingrese el email' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Input type="email" />
                </Form.Item>
              ) : (
                selectedItem?.email || '-'
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Rubro">
              {isEditing ? (
                <Form.Item
                  name="rubro"
                  rules={[{ required: true, message: 'Por favor ingrese el rubro' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Input />
                </Form.Item>
              ) : (
                selectedItem?.rubro || '-'
              )}
            </Descriptions.Item>
          </Descriptions>
        </Form>
      </Modal>
    </div>
  );
};

export default Providers;
