import { useState, useCallback } from 'react';
import { Table, Typography, Button, Modal, Form, Input, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface ProviderItem {
  key: string;
  nombre: string;
  contacto: string;
  email: string;
  rubro: string;
}

const Providers = () => {
  const [data, setData] = useState<ProviderItem[]>([
    { key: '1', nombre: 'Distribuidora Tech', contacto: '+54 11 4567-8901', email: 'ventas@disttech.com', rubro: 'Computación' },
    { key: '2', nombre: 'Importaciones Global', contacto: '+54 11 4567-8902', email: 'info@impglobal.com', rubro: 'Electrónica' },
    { key: '3', nombre: 'Mayorista Central', contacto: '+54 11 4567-8903', email: 'contacto@mayorista.com', rubro: 'General' },
    { key: '4', nombre: 'Electrónica SA', contacto: '+54 11 4567-8904', email: 'ventas@electronicasa.com', rubro: 'Electrónica' },
    { key: '5', nombre: 'Tech Supplies', contacto: '+54 11 4567-8905', email: 'info@techsupplies.com', rubro: 'Accesorios' },
    { key: '6', nombre: 'Periféricos Pro', contacto: '+54 11 4567-8906', email: 'ventas@perifericospro.com', rubro: 'Periféricos' },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleAddItem = useCallback(() => {
    setEditingKey(null);
    form.resetFields();
    setModalOpen(true);
  }, [form]);

  const handleEditItem = useCallback((item: ProviderItem) => {
    setEditingKey(item.key);
    form.setFieldsValue({
      nombre: item.nombre,
      contacto: item.contacto,
      email: item.email,
      rubro: item.rubro,
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

  const columns: ColumnsType<ProviderItem> = [
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
      render: (_: any, record: ProviderItem) => (
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
          <Title level={2} style={{ margin: 0 }}>Proveedores</Title>
          <Paragraph>
            Directorio completo de proveedores. Acceda a información de contacto y categorías de productos.
          </Paragraph>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddItem}>
          Nuevo Proveedor
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />

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
    </div>
  );
};

export default Providers;
