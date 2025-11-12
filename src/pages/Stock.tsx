import { useState } from 'react';
import { Table, Typography, Tag, Button, Modal, Form, Input, InputNumber, Select, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Stock = () => {
  const [data, setData] = useState([
    { key: '1', producto: 'Laptop HP 15', sku: 'LAP-HP-001', cantidad: 45, estado: 'Disponible' },
    { key: '2', producto: 'Mouse Logitech M185', sku: 'MOU-LOG-185', cantidad: 120, estado: 'Disponible' },
    { key: '3', producto: 'Teclado Mecánico RGB', sku: 'TEC-RGB-001', cantidad: 8, estado: 'Bajo' },
    { key: '4', producto: 'Monitor Samsung 27"', sku: 'MON-SAM-027', cantidad: 2, estado: 'Crítico' },
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
      producto: item.producto,
      sku: item.sku,
      cantidad: item.cantidad,
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
    setEditingKey(null);
    setModalOpen(false);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Imagen',
      dataIndex: 'imagen',
      key: 'imagen',
      width: 80,
      render: (imagen) => (
        imagen ? (
          <Image 
            src={imagen} 
            alt="producto" 
            width={50} 
            height={50}
            style={{
              objectFit: 'cover',
              borderRadius: 4,
            }}
          />
        ) : (
          <div style={{
            width: 50,
            height: 50,
            backgroundColor: '#f0f0f0',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999'
          }}>
            —
          </div>
        )
      ),
    },
    {
      title: 'Producto',
      dataIndex: 'producto',
      key: 'producto',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Cantidad',
      dataIndex: 'cantidad',
      key: 'cantidad',
      sorter: (a, b) => a.cantidad - b.cantidad,
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado) => {
        const color = estado === 'Disponible' ? 'green' : estado === 'Bajo' ? 'orange' : 'red';
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
            style={{ transition: 'all 0.2s ease' }}
          />
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteItem(record.key)}
            style={{ transition: 'all 0.2s ease' }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2} style={{ margin: 0 }}>Stock</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddItem}>
          Agregar Producto
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />

      <Modal
        title={editingKey ? 'Editar Producto' : 'Agregar Producto'}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditingKey(null);
          form.resetFields();
        }}
        okText="Guardar"
        cancelText="Cancelar"
        onOk={() => form.submit()}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveItem}
        >
          <Form.Item
            name="producto"
            label="Nombre del Producto"
            rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="sku"
            label="SKU"
            rules={[{ required: true, message: 'Por favor ingrese el SKU' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cantidad"
            label="Cantidad"
            rules={[{ required: true, message: 'Por favor ingrese la cantidad' }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="estado"
            label="Estado"
            rules={[{ required: true, message: 'Por favor seleccione el estado' }]}
          >
            <Select options={[
              { label: 'Disponible', value: 'Disponible' },
              { label: 'Bajo', value: 'Bajo' },
              { label: 'Crítico', value: 'Crítico' },
            ]} />
          </Form.Item>
          <Form.Item
            name="imagen"
            label="URL de la Imagen"
            rules={[
              { 
                pattern: /^https?:\/\/.+/, 
                message: 'Por favor ingrese una URL válida (comenzando con http:// o https://)' 
              }
            ]}
          >
            <Input placeholder="https://ejemplo.com/imagen.jpg" />
          </Form.Item>
          
          <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.imagen !== currentValues.imagen}>
            {({ getFieldValue }) => 
              getFieldValue('imagen') ? (
                <div style={{ marginTop: 16, padding: '12px', backgroundColor: '#f5f5f5', borderRadius: 8 }}>
                  <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>Vista previa de la imagen:</div>
                  <Image 
                    src={getFieldValue('imagen')} 
                    alt="preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: 200,
                      borderRadius: 4,
                      objectFit: 'contain'
                    }}
                  />
                </div>
              ) : null
            }
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Stock;
