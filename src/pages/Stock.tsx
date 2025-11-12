import { useState } from 'react';
import { Table, Typography, Tag, Button, Modal, Form, Input, InputNumber, Select, Space, Image, Descriptions, Row, Col, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined, AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useTheme } from '../context/ThemeContext';

const { Title } = Typography;

const Stock = () => {
  const { isDark } = useTheme();
  const [data, setData] = useState([
    { 
      key: '1', 
      producto: 'Laptop HP 15', 
      sku: 'LAP-HP-001', 
      cantidad: 45, 
      estado: 'Disponible',
      categoria: 'Computadoras',
      precio: 85000,
      imagen: 'https://images.pexels.com/photos/1006293/pexels-photo-1006293.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    { 
      key: '2', 
      producto: 'Mouse Logitech M185', 
      sku: 'MOU-LOG-185', 
      cantidad: 120, 
      estado: 'Disponible',
      categoria: 'Periféricos',
      precio: 3500,
      imagen: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    { 
      key: '3', 
      producto: 'Teclado Mecánico RGB', 
      sku: 'TEC-RGB-001', 
      cantidad: 8, 
      estado: 'Bajo',
      categoria: 'Periféricos',
      precio: 12000,
      imagen: 'https://images.pexels.com/photos/1334584/pexels-photo-1334584.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    { 
      key: '4', 
      producto: 'Monitor Samsung 27"', 
      sku: 'MON-SAM-027', 
      cantidad: 2, 
      estado: 'Crítico',
      categoria: 'Monitores',
      precio: 45000,
      imagen: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [selectedItem, setSelectedItem] = useState(null);
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
      categoria: item.categoria,
      precio: item.precio,
      imagen: item.imagen,
    });
    setModalOpen(true);
  };

  const handleViewItem = (item) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  const handleDeleteItem = (key) => {
    Modal.confirm({
      title: '¿Está seguro de eliminar este producto?',
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
      title: 'Categoría',
      dataIndex: 'categoria',
      key: 'categoria',
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
      key: 'precio',
      render: (precio) => `$${precio.toLocaleString()}`,
      sorter: (a, b) => a.precio - b.precio,
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
        <Col xs={24} sm={12}>
          <Title level={2} style={{ margin: 0 }}>Inventario</Title>
        </Col>
        <Col xs={24} sm={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
          <Button.Group>
            <Button 
              type={viewMode === 'table' ? 'primary' : 'default'}
              icon={<UnorderedListOutlined />}
              onClick={() => setViewMode('table')}
            />
            <Button 
              type={viewMode === 'grid' ? 'primary' : 'default'}
              icon={<AppstoreOutlined />}
              onClick={() => setViewMode('grid')}
            />
          </Button.Group>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAddItem}
          >
            <span className="btn-text">Agregar Producto</span>
          </Button>
        </Col>
      </Row>
      
      {viewMode === 'table' ? (
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
      ) : (
        <div className="fade-in-table">
          <Row gutter={[16, 16]}>
            {data.map((item) => (
              <Col key={item.key} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={
                    <div style={{ height: 200, overflow: 'hidden', background: '#f5f5f5' }}>
                      <Image
                        src={item.imagen}
                        alt={item.producto}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        preview={false}
                      />
                    </div>
                  }
                  onClick={() => handleViewItem(item)}
                  style={{ position: 'relative' }}
                >
                  <Card.Meta
                    title={item.producto}
                    description={
                      <Space direction="vertical" size={4} style={{ width: '100%' }}>
                        <div>SKU: {item.sku}</div>
                        <div>Cantidad: {item.cantidad}</div>
                        <div>Precio: ${item.precio.toLocaleString()}</div>
                        <Tag color={item.estado === 'Disponible' ? 'green' : item.estado === 'Bajo' ? 'orange' : 'red'}>
                          {item.estado}
                        </Tag>
                      </Space>
                    }
                  />
                  <div 
                    className="card-hover-info"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0, 0, 0, 0.9)',
                      color: 'white',
                      padding: '20px',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      pointerEvents: 'none',
                      borderRadius: '8px',
                    }}
                  >
                    <h3 style={{ color: 'white', margin: '0 0 12px 0', fontSize: '16px' }}>{item.producto}</h3>
                    <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>SKU:</strong> {item.sku}</p>
                    <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Categoría:</strong> {item.categoria}</p>
                    <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Cantidad:</strong> {item.cantidad}</p>
                    <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Precio:</strong> ${item.precio.toLocaleString()}</p>
                    <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Estado:</strong> {item.estado}</p>
                    <p style={{ margin: '12px 0 0 0', fontSize: '12px', opacity: 0.8 }}>Click para ver más detalles</p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Modal de Vista */}
      <Modal
        title="Detalle del Producto"
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
        width={600}
      >
        {selectedItem && (
          <div>
            {selectedItem.imagen && (
              <div style={{ marginBottom: 16, textAlign: 'center' }}>
                <Image 
                  src={selectedItem.imagen} 
                  alt={selectedItem.producto}
                  style={{
                    maxWidth: '100%',
                    maxHeight: 300,
                    objectFit: 'contain',
                    borderRadius: 8
                  }}
                />
              </div>
            )}
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Producto">{selectedItem.producto}</Descriptions.Item>
              <Descriptions.Item label="SKU">{selectedItem.sku}</Descriptions.Item>
              <Descriptions.Item label="Categoría">{selectedItem.categoria}</Descriptions.Item>
              <Descriptions.Item label="Precio">${selectedItem.precio.toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="Cantidad">{selectedItem.cantidad}</Descriptions.Item>
              <Descriptions.Item label="Estado">
                <Tag color={
                  selectedItem.estado === 'Disponible' ? 'green' : 
                  selectedItem.estado === 'Bajo' ? 'orange' : 'red'
                }>
                  {selectedItem.estado}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      {/* Modal de Edición/Agregar */}
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
            name="categoria"
            label="Categoría"
            rules={[{ required: true, message: 'Por favor ingrese la categoría' }]}
          >
            <Select options={[
              { label: 'Computadoras', value: 'Computadoras' },
              { label: 'Periféricos', value: 'Periféricos' },
              { label: 'Monitores', value: 'Monitores' },
              { label: 'Accesorios', value: 'Accesorios' },
              { label: 'Componentes', value: 'Componentes' },
            ]} />
          </Form.Item>
          <Form.Item
            name="precio"
            label="Precio"
            rules={[{ required: true, message: 'Por favor ingrese el precio' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} prefix="$" />
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
                <div style={{ 
                  marginTop: 16, 
                  padding: '12px', 
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f5f5f5', 
                  borderRadius: 8,
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : 'none'
                }}>
                  <div style={{ 
                    fontSize: 12, 
                    color: isDark ? 'rgba(255, 255, 255, 0.65)' : '#666', 
                    marginBottom: 8 
                  }}>
                    Vista previa de la imagen:
                  </div>
                  <Image 
                    src={getFieldValue('imagen')} 
                    alt="preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: 200,
                      borderRadius: 4,
                      objectFit: 'contain',
                      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.2)' : '#fff'
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
