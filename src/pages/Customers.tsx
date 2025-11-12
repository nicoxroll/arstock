import { useState } from 'react';
import { Table, Typography, Button, Modal, Form, Input, InputNumber, Space, Row, Col, Descriptions } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Customers = () => {
  const [data, setData] = useState([
    { key: '1', nombre: 'Martín Rodríguez', email: 'martin.r@email.com', ultimaCompra: '2024-02-01', totalGastado: 125000 },
    { key: '2', nombre: 'Sofía Gutiérrez', email: 'sofia.g@email.com', ultimaCompra: '2024-01-28', totalGastado: 89000 },
    { key: '3', nombre: 'Pablo Díaz', email: 'pablo.d@email.com', ultimaCompra: '2024-01-25', totalGastado: 156000 },
    { key: '4', nombre: 'Lucía Torres', email: 'lucia.t@email.com', ultimaCompra: '2024-02-03', totalGastado: 45000 },
    { key: '5', nombre: 'Fernando Castro', email: 'fernando.c@email.com', ultimaCompra: '2024-01-30', totalGastado: 203000 },
    { key: '6', nombre: 'Valentina Ruiz', email: 'valentina.r@email.com', ultimaCompra: '2024-02-02', totalGastado: 67000 },
    { key: '7', nombre: 'Mateo Silva', email: 'mateo.s@email.com', ultimaCompra: '2024-01-22', totalGastado: 34000 },
    { key: '8', nombre: 'Camila Morales', email: 'camila.m@email.com', ultimaCompra: '2024-02-04', totalGastado: 98000 },
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
      email: item.email,
      ultimaCompra: item.ultimaCompra,
      totalGastado: item.totalGastado,
    });
    setViewModalOpen(true);
  };

  const handleEditItem = () => {
    setIsEditing(true);
  };

  const handleDeleteItem = (key) => {
    Modal.confirm({
      title: '¿Está seguro de eliminar este cliente?',
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Última Compra',
      dataIndex: 'ultimaCompra',
      key: 'ultimaCompra',
    },
    {
      title: 'Total Gastado',
      dataIndex: 'totalGastado',
      key: 'totalGastado',
      render: (total) => `$${total.toLocaleString()}`,
      sorter: (a, b) => a.totalGastado - b.totalGastado,
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
          <Title level={2} style={{ margin: 0 }}>Clientes</Title>
          <Paragraph style={{ margin: 0 }}>
            Base de datos de clientes. Acceda al historial de compras y valor total de cada cliente.
          </Paragraph>
        </Col>
        <Col xs={24} sm={8} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAddItem}
          >
            <span className="btn-text">Nuevo Cliente</span>
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
        title={selectedItem ? (isEditing ? 'Editar Cliente' : 'Detalle de Cliente') : 'Agregar Cliente'}
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
                  email: selectedItem.email,
                  ultimaCompra: selectedItem.ultimaCompra,
                  totalGastado: selectedItem.totalGastado,
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
            <Descriptions.Item label="Última Compra">
              {isEditing ? (
                <Form.Item
                  name="ultimaCompra"
                  rules={[{ required: true, message: 'Por favor ingrese la fecha' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Input type="date" />
                </Form.Item>
              ) : (
                selectedItem?.ultimaCompra || '-'
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Total Gastado">
              {isEditing ? (
                <Form.Item
                  name="totalGastado"
                  rules={[{ required: true, message: 'Por favor ingrese el total' }]}
                  style={{ marginBottom: 0 }}
                >
                  <InputNumber min={0} style={{ width: '100%' }} prefix="$" />
                </Form.Item>
              ) : (
                selectedItem ? `$${selectedItem.totalGastado.toLocaleString()}` : '-'
              )}
            </Descriptions.Item>
          </Descriptions>
        </Form>
      </Modal>
    </div>
  );
};

export default Customers;
