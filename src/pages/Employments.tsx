import { useState, useCallback } from 'react';
import { Table, Typography, Tag, Button, Modal, Form, Input, Select, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface EmploymentItem {
  key: string;
  nombre: string;
  puesto: string;
  email: string;
  estado: string;
}

const Employments = () => {
  const [data, setData] = useState<EmploymentItem[]>([
    { key: '1', nombre: 'Juan Pérez', puesto: 'Gerente', email: 'juan.perez@arstock.com', estado: 'Activo' },
    { key: '2', nombre: 'María García', puesto: 'Vendedora', email: 'maria.garcia@arstock.com', estado: 'Activo' },
    { key: '3', nombre: 'Carlos López', puesto: 'Encargado de Stock', email: 'carlos.lopez@arstock.com', estado: 'Activo' },
    { key: '4', nombre: 'Ana Martínez', puesto: 'Vendedora', email: 'ana.martinez@arstock.com', estado: 'Vacaciones' },
    { key: '5', nombre: 'Roberto Sánchez', puesto: 'Cajero', email: 'roberto.sanchez@arstock.com', estado: 'Activo' },
    { key: '6', nombre: 'Laura Fernández', puesto: 'Contadora', email: 'laura.fernandez@arstock.com', estado: 'Activo' },
    { key: '7', nombre: 'Diego Romero', puesto: 'Vendedor', email: 'diego.romero@arstock.com', estado: 'Inactivo' },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleAddItem = useCallback(() => {
    setEditingKey(null);
    form.resetFields();
    setModalOpen(true);
  }, [form]);

  const handleEditItem = useCallback((item: EmploymentItem) => {
    setEditingKey(item.key);
    form.setFieldsValue({
      nombre: item.nombre,
      puesto: item.puesto,
      email: item.email,
      estado: item.estado,
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

  const columns: ColumnsType<EmploymentItem> = [
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
      render: (estado: string) => {
        const color = estado === 'Activo' ? 'green' : estado === 'Vacaciones' ? 'blue' : 'red';
        return <Tag color={color}>{estado}</Tag>;
      },
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_: any, record: EmploymentItem) => (
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
          <Title level={2} style={{ margin: 0 }}>Empleados</Title>
          <Paragraph>
            Gestión del personal del local. Visualice información de contacto y estado laboral de cada empleado.
          </Paragraph>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddItem}>
          Nuevo Empleado
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />

      <Modal
        title={editingKey ? 'Editar Empleado' : 'Nuevo Empleado'}
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
            label="Nombre del Empleado"
            rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="puesto"
            label="Puesto"
            rules={[{ required: true, message: 'Por favor ingrese el puesto' }]}
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
            name="estado"
            label="Estado"
            rules={[{ required: true, message: 'Por favor seleccione el estado' }]}
          >
            <Select options={[
              { label: 'Activo', value: 'Activo' },
              { label: 'Vacaciones', value: 'Vacaciones' },
              { label: 'Inactivo', value: 'Inactivo' },
            ]} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Employments;
