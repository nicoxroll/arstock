import { useState } from 'react';
import { Table, Typography, Tag, Button, Modal, Form, Input, InputNumber, Select, Space, Row, Col, Descriptions } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Billing = () => {
  const [data, setData] = useState([
    { key: '1', id: 'FAC-2024-001', cliente: 'Tech Solutions SA', fecha: '2024-01-15', monto: 45000, estado: 'Pagada' },
    { key: '2', id: 'FAC-2024-002', cliente: 'Distribuidora Central', fecha: '2024-01-18', monto: 32500, estado: 'Pagada' },
    { key: '3', id: 'FAC-2024-003', cliente: 'Comercial Sur', fecha: '2024-01-22', monto: 18900, estado: 'Pendiente' },
    { key: '4', id: 'FAC-2024-004', cliente: 'Sistemas Integrados', fecha: '2024-01-25', monto: 67000, estado: 'Pagada' },
    { key: '5', id: 'FAC-2024-005', cliente: 'Digital Store', fecha: '2024-01-28', monto: 12300, estado: 'Vencida' },
    { key: '6', id: 'FAC-2024-006', cliente: 'Mayorista Express', fecha: '2024-02-02', monto: 54800, estado: 'Pendiente' },
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
      id: item.id,
      cliente: item.cliente,
      fecha: item.fecha,
      monto: item.monto,
      estado: item.estado,
    });
    setViewModalOpen(true);
  };

  const handleEditItem = () => {
    setIsEditing(true);
  };

  const handleDeleteItem = (key) => {
    Modal.confirm({
      title: '¿Está seguro de eliminar esta factura?',
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
      // Editar factura existente
      setData(data.map(item =>
        item.key === selectedItem.key
          ? { ...item, ...values }
          : item
      ));
    } else {
      // Agregar nueva factura
      setData([...data, { key: Date.now().toString(), ...values }]);
    }
    setViewModalOpen(false);
    setSelectedItem(null);
    setIsEditing(false);
    form.resetFields();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
    },
    {
      title: 'Monto',
      dataIndex: 'monto',
      key: 'monto',
      render: (monto) => `$${monto.toLocaleString()}`,
      sorter: (a, b) => a.monto - b.monto,
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado) => {
        const color = estado === 'Pagada' ? 'green' : estado === 'Pendiente' ? 'orange' : 'red';
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
          <Title level={2} style={{ margin: 0 }}>Facturación</Title>
          <Paragraph style={{ margin: 0 }}>
            Gestión completa de facturas emitidas. Visualice el estado de pagos, montos pendientes y facturas vencidas.
          </Paragraph>
        </Col>
        <Col xs={24} sm={8} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAddItem}
          >
            <span className="btn-text">Nueva Factura</span>
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
        title={selectedItem ? (isEditing ? 'Editar Factura' : 'Detalle de Factura') : 'Agregar Factura'}
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
                  id: selectedItem.id,
                  cliente: selectedItem.cliente,
                  fecha: selectedItem.fecha,
                  monto: selectedItem.monto,
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
            <Descriptions.Item label="ID">
              {isEditing ? (
                <Form.Item
                  name="id"
                  rules={[{ required: true, message: 'Por favor ingrese el ID' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Input />
                </Form.Item>
              ) : (
                selectedItem?.id || '-'
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Cliente">
              {isEditing ? (
                <Form.Item
                  name="cliente"
                  rules={[{ required: true, message: 'Por favor ingrese el cliente' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Input />
                </Form.Item>
              ) : (
                selectedItem?.cliente || '-'
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Fecha">
              {isEditing ? (
                <Form.Item
                  name="fecha"
                  rules={[{ required: true, message: 'Por favor ingrese la fecha' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Input type="date" />
                </Form.Item>
              ) : (
                selectedItem?.fecha || '-'
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Monto">
              {isEditing ? (
                <Form.Item
                  name="monto"
                  rules={[{ required: true, message: 'Por favor ingrese el monto' }]}
                  style={{ marginBottom: 0 }}
                >
                  <InputNumber min={0} style={{ width: '100%' }} prefix="$" />
                </Form.Item>
              ) : (
                selectedItem ? `$${selectedItem.monto.toLocaleString()}` : '-'
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
                    { label: 'Pagada', value: 'Pagada' },
                    { label: 'Pendiente', value: 'Pendiente' },
                    { label: 'Vencida', value: 'Vencida' },
                  ]} />
                </Form.Item>
              ) : (
                selectedItem && (
                  <Tag color={selectedItem.estado === 'Pagada' ? 'green' : selectedItem.estado === 'Pendiente' ? 'orange' : 'red'}>
                    {selectedItem.estado}
                  </Tag>
                )
              )}
            </Descriptions.Item>
          </Descriptions>
        </Form>
      </Modal>

      <Modal
        title={selectedItem ? (isEditing ? 'Editar Factura' : 'Detalle de Factura') : 'Agregar Factura'}
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
                  id: selectedItem.id,
                  cliente: selectedItem.cliente,
                  fecha: selectedItem.fecha,
                  monto: selectedItem.monto,
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
            <Descriptions.Item label="ID">
              {isEditing ? (
                <Form.Item
                  name="id"
                  rules={[{ required: true, message: 'Por favor ingrese el ID' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Input />
                </Form.Item>
              ) : (
                selectedItem?.id || '-'
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Cliente">
              {isEditing ? (
                <Form.Item
                  name="cliente"
                  rules={[{ required: true, message: 'Por favor ingrese el cliente' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Input />
                </Form.Item>
              ) : (
                selectedItem?.cliente || '-'
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Fecha">
              {isEditing ? (
                <Form.Item
                  name="fecha"
                  rules={[{ required: true, message: 'Por favor ingrese la fecha' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Input type="date" />
                </Form.Item>
              ) : (
                selectedItem?.fecha || '-'
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Monto">
              {isEditing ? (
                <Form.Item
                  name="monto"
                  rules={[{ required: true, message: 'Por favor ingrese el monto' }]}
                  style={{ marginBottom: 0 }}
                >
                  <InputNumber min={0} style={{ width: '100%' }} prefix="$" />
                </Form.Item>
              ) : (
                selectedItem ? `$${selectedItem.monto.toLocaleString()}` : '-'
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
                    { label: 'Pagada', value: 'Pagada' },
                    { label: 'Pendiente', value: 'Pendiente' },
                    { label: 'Vencida', value: 'Vencida' },
                  ]} />
                </Form.Item>
              ) : (
                selectedItem && (
                  <Tag color={selectedItem.estado === 'Pagada' ? 'green' : selectedItem.estado === 'Pendiente' ? 'orange' : 'red'}>
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

export default Billing;
