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
      proveedor: item.proveedor,
      factura: item.factura,
      vencimiento: item.vencimiento,
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
      title: '¿Está seguro de eliminar esta deuda?',
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
        title={selectedItem ? (isEditing ? 'Editar Deuda' : 'Detalle de Deuda') : 'Agregar Deuda'}
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
                  proveedor: selectedItem.proveedor,
                  factura: selectedItem.factura,
                  vencimiento: selectedItem.vencimiento,
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
            <Descriptions.Item label="Proveedor">
              {isEditing ? (
                <Form.Item
                  name="proveedor"
                  rules={[{ required: true, message: 'Por favor ingrese el proveedor' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Input />
                </Form.Item>
              ) : (
                selectedItem?.proveedor || '-'
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Factura">
              {isEditing ? (
                <Form.Item
                  name="factura"
                  rules={[{ required: true, message: 'Por favor ingrese el número de factura' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Input />
                </Form.Item>
              ) : (
                selectedItem?.factura || '-'
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Vencimiento">
              {isEditing ? (
                <Form.Item
                  name="vencimiento"
                  rules={[{ required: true, message: 'Por favor ingrese la fecha' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Input type="date" />
                </Form.Item>
              ) : (
                selectedItem?.vencimiento || '-'
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
                    { label: 'Al día', value: 'Al día' },
                    { label: 'Próximo', value: 'Próximo' },
                    { label: 'Vencida', value: 'Vencida' },
                  ]} />
                </Form.Item>
              ) : (
                selectedItem && (
                  <Tag color={selectedItem.estado === 'Al día' ? 'green' : selectedItem.estado === 'Próximo' ? 'orange' : 'red'}>
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

export default Debts;
