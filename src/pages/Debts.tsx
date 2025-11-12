import { useState } from 'react';
import { Table, Typography, Tag, Button, Modal, Form, Input, InputNumber, Select, Space, Row, Col, Descriptions } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Debts = () => {
  const [data, setData] = useState([
    { key: '1', proveedor: 'Distribuidora Tech', factura: 'PROV-001', vencimiento: '2024-02-15', monto: 28000, estado: 'Al día' },
    { key: '2', proveedor: 'Importaciones Global', factura: 'PROV-002', vencimiento: '2024-02-10', monto: 45000, estado: 'Próximo' },
    { key: '3', proveedor: 'Mayorista Central', factura: 'PROV-003', vencimiento: '2024-01-30', monto: 15500, estado: 'Vencida' },
    { key: '4', proveedor: 'Electrónica SA', factura: 'PROV-004', vencimiento: '2024-02-20', monto: 32000, estado: 'Al día' },
    { key: '5', proveedor: 'Tech Supplies', factura: 'PROV-005', vencimiento: '2024-02-08', monto: 19800, estado: 'Próximo' },
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
      proveedor: item.proveedor,
      factura: item.factura,
      vencimiento: item.vencimiento,
      monto: item.monto,
      estado: item.estado,
    });
    setModalOpen(true);
  };

  const handleDeleteItem = (key) => {
    Modal.confirm({
      title: '¿Está seguro de eliminar esta deuda?',
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
      title: 'Proveedor',
      dataIndex: 'proveedor',
      key: 'proveedor',
    },
    {
      title: 'Factura',
      dataIndex: 'factura',
      key: 'factura',
    },
    {
      title: 'Vencimiento',
      dataIndex: 'vencimiento',
      key: 'vencimiento',
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
        const color = estado === 'Al día' ? 'green' : estado === 'Próximo' ? 'orange' : 'red';
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
          <Title level={2} style={{ margin: 0 }}>Cuentas por Pagar</Title>
          <Paragraph style={{ margin: 0 }}>
            Control de deudas con proveedores. Mantenga un seguimiento de las fechas de vencimiento y estados de pago.
          </Paragraph>
        </Col>
        <Col xs={24} sm={8} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAddItem}
          >
            <span className="btn-text">Nueva Deuda</span>
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
        title={editingKey ? 'Editar Deuda' : 'Nueva Deuda'}
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
            name="proveedor"
            label="Proveedor"
            rules={[{ required: true, message: 'Por favor ingrese el proveedor' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="factura"
            label="Factura"
            rules={[{ required: true, message: 'Por favor ingrese el número de factura' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="vencimiento"
            label="Vencimiento"
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
              { label: 'Al día', value: 'Al día' },
              { label: 'Próximo', value: 'Próximo' },
              { label: 'Vencida', value: 'Vencida' },
            ]} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Detalle de Deuda"
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
            <Descriptions.Item label="Proveedor">{selectedItem.proveedor}</Descriptions.Item>
            <Descriptions.Item label="Factura">{selectedItem.factura}</Descriptions.Item>
            <Descriptions.Item label="Vencimiento">{selectedItem.vencimiento}</Descriptions.Item>
            <Descriptions.Item label="Monto">${selectedItem.monto.toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="Estado">
              <Tag color={selectedItem.estado === 'Al día' ? 'green' : selectedItem.estado === 'Próximo' ? 'orange' : 'red'}>
                {selectedItem.estado}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default Debts;
