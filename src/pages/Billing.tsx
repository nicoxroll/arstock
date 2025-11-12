import { useState } from 'react';
import { Table, Typography, Tag, Button, Modal, Form, Input, InputNumber, Select, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

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

  const [modalOpen, setModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [form] = Form.useForm();

  const handleAddItem = () => {
    setEditingKey(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEditItem = (item) => {
    setEditingKey(item.key);
    form.setFieldsValue({
      id: item.id,
      cliente: item.cliente,
      fecha: item.fecha,
      monto: item.monto,
      estado: item.estado,
    });
    setModalOpen(true);
  };

  const handleDeleteItem = (key) => {
    setData(data.filter(item => item.key !== key));
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
            icon={<EditOutlined />}
            onClick={() => handleEditItem(record)}
          />
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteItem(record.key)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>Facturación</Title>
          <Paragraph>
            Gestión completa de facturas emitidas. Visualice el estado de pagos, montos pendientes y facturas vencidas.
          </Paragraph>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddItem}>
          Nueva Factura
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />

      <Modal
        title={editingKey ? 'Editar Factura' : 'Nueva Factura'}
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
            name="id"
            label="ID de Factura"
            rules={[{ required: true, message: 'Por favor ingrese el ID' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cliente"
            label="Cliente"
            rules={[{ required: true, message: 'Por favor ingrese el cliente' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="fecha"
            label="Fecha"
            rules={[{ required: true, message: 'Por favor ingrese la fecha' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="monto"
            label="Monto"
            rules={[{ required: true, message: 'Por favor ingrese el monto' }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="estado"
            label="Estado"
            rules={[{ required: true, message: 'Por favor seleccione el estado' }]}
          >
            <Select options={[
              { label: 'Pagada', value: 'Pagada' },
              { label: 'Pendiente', value: 'Pendiente' },
              { label: 'Vencida', value: 'Vencida' },
            ]} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Billing;
