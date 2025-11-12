import { useState, useCallback } from 'react';
import { Table, Typography, Button, Modal, Form, Input, InputNumber, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface CustomerItem {
  key: string;
  nombre: string;
  email: string;
  ultimaCompra: string;
  totalGastado: number;
}

const Customers = () => {
  const [data, setData] = useState<CustomerItem[]>([
    { key: '1', nombre: 'Martín Rodríguez', email: 'martin.r@email.com', ultimaCompra: '2024-02-01', totalGastado: 125000 },
    { key: '2', nombre: 'Sofía Gutiérrez', email: 'sofia.g@email.com', ultimaCompra: '2024-01-28', totalGastado: 89000 },
    { key: '3', nombre: 'Pablo Díaz', email: 'pablo.d@email.com', ultimaCompra: '2024-01-25', totalGastado: 156000 },
    { key: '4', nombre: 'Lucía Torres', email: 'lucia.t@email.com', ultimaCompra: '2024-02-03', totalGastado: 45000 },
    { key: '5', nombre: 'Fernando Castro', email: 'fernando.c@email.com', ultimaCompra: '2024-01-30', totalGastado: 203000 },
    { key: '6', nombre: 'Valentina Ruiz', email: 'valentina.r@email.com', ultimaCompra: '2024-02-02', totalGastado: 67000 },
    { key: '7', nombre: 'Mateo Silva', email: 'mateo.s@email.com', ultimaCompra: '2024-01-22', totalGastado: 34000 },
    { key: '8', nombre: 'Camila Morales', email: 'camila.m@email.com', ultimaCompra: '2024-02-04', totalGastado: 98000 },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleAddItem = useCallback(() => {
    setEditingKey(null);
    form.resetFields();
    setModalOpen(true);
  }, [form]);

  const handleEditItem = useCallback((item: CustomerItem) => {
    setEditingKey(item.key);
    form.setFieldsValue({
      nombre: item.nombre,
      email: item.email,
      ultimaCompra: item.ultimaCompra,
      totalGastado: item.totalGastado,
    });
    setModalOpen(true);
  }, [form]);

  const handleDeleteItem = useCallback((key: string) => {
    setData(data.filter(item => item.key !== key));
  }, [data]);

  const handleSaveItem = useCallback((values: any) => {
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
  }, [editingKey, data, form]);

  const columns: ColumnsType<CustomerItem> = [
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
      render: (total: number) => `$${total.toLocaleString()}`,
      sorter: (a, b) => a.totalGastado - b.totalGastado,
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_: any, record: CustomerItem) => (
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
          <Title level={2} style={{ margin: 0 }}>Clientes</Title>
          <Paragraph>
            Base de datos de clientes. Acceda al historial de compras y valor total de cada cliente.
          </Paragraph>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddItem}>
          Nuevo Cliente
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />

      <Modal
        title={editingKey ? 'Editar Cliente' : 'Nuevo Cliente'}
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
            label="Nombre del Cliente"
            rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
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
            name="ultimaCompra"
            label="Última Compra"
            rules={[{ required: true, message: 'Por favor ingrese la fecha' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="totalGastado"
            label="Total Gastado"
            rules={[{ required: true, message: 'Por favor ingrese el total' }]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Customers;
