import { useState } from 'react';
import { Table, Typography, Tag, Button, Modal, Form, Input, Select, Space, Row, Col, Descriptions } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Employments = () => {
  const [data, setData] = useState([
    { key: '1', nombre: 'Juan Pérez', puesto: 'Gerente', email: 'juan.perez@arstock.com', estado: 'Activo' },
    { key: '2', nombre: 'María García', puesto: 'Vendedora', email: 'maria.garcia@arstock.com', estado: 'Activo' },
    { key: '3', nombre: 'Carlos López', puesto: 'Encargado de Stock', email: 'carlos.lopez@arstock.com', estado: 'Activo' },
    { key: '4', nombre: 'Ana Martínez', puesto: 'Vendedora', email: 'ana.martinez@arstock.com', estado: 'Vacaciones' },
    { key: '5', nombre: 'Roberto Sánchez', puesto: 'Cajero', email: 'roberto.sanchez@arstock.com', estado: 'Activo' },
    { key: '6', nombre: 'Laura Fernández', puesto: 'Contadora', email: 'laura.fernandez@arstock.com', estado: 'Activo' },
    { key: '7', nombre: 'Diego Romero', puesto: 'Vendedor', email: 'diego.romero@arstock.com', estado: 'Inactivo' },
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
      puesto: item.puesto,
      email: item.email,
      estado: item.estado,
    });
    setViewModalOpen(true);
  };

  const handleEditItem = () => {
    setIsEditing(true);
  };

  const handleDeleteItem = (key) => {
    Modal.confirm({
      title: '¿Está seguro de eliminar este empleado?',
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
      title: 'Puesto',
      dataIndex: 'puesto',
      key: 'puesto',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado) => {
        const color = estado === 'Activo' ? 'green' : estado === 'Vacaciones' ? 'blue' : 'red';
        return <Tag color={color}>{estado}</Tag>;
      },
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
          <Title level={2} style={{ margin: 0 }}>Empleados</Title>
          <Paragraph style={{ margin: 0 }}>
            Gestión del personal del local. Visualice información de contacto y estado laboral de cada empleado.
          </Paragraph>
        </Col>
        <Col xs={24} sm={8} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAddItem}
          >
            <span className="btn-text">Nuevo Empleado</span>
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
        title={selectedItem ? (isEditing ? 'Editar Empleado' : 'Detalle de Empleado') : 'Agregar Empleado'}
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
                  puesto: selectedItem.puesto,
                  email: selectedItem.email,
                  estado: selectedItem.estado,
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
            <Descriptions.Item label="Puesto">
              {isEditing ? (
                <Form.Item
                  name="puesto"
                  rules={[{ required: true, message: 'Por favor ingrese el puesto' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Input />
                </Form.Item>
              ) : (
                selectedItem?.puesto || '-'
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
            <Descriptions.Item label="Estado">
              {isEditing ? (
                <Form.Item
                  name="estado"
                  rules={[{ required: true, message: 'Por favor seleccione el estado' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Select options={[
                    { label: 'Activo', value: 'Activo' },
                    { label: 'Vacaciones', value: 'Vacaciones' },
                    { label: 'Inactivo', value: 'Inactivo' },
                  ]} />
                </Form.Item>
              ) : (
                selectedItem && (
                  <Tag color={selectedItem.estado === 'Activo' ? 'green' : selectedItem.estado === 'Vacaciones' ? 'blue' : 'red'}>
                    {selectedItem.estado}
                  </Tag>
                )
              )}
            </Descriptions.Item>
          </Descriptions>
        </Form>
      </Modal>
    </div>
  );
};

export default Employments;
