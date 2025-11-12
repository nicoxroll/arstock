import { Table, Typography, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface StockItem {
  key: string;
  producto: string;
  sku: string;
  cantidad: number;
  estado: string;
}

const Stock = () => {
  const columns: ColumnsType<StockItem> = [
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
      render: (estado: string) => {
        const color = estado === 'Disponible' ? 'green' : estado === 'Bajo' ? 'orange' : 'red';
        return <Tag color={color}>{estado}</Tag>;
      },
    },
  ];

  const data: StockItem[] = [
    { key: '1', producto: 'Laptop HP 15', sku: 'LAP-HP-001', cantidad: 45, estado: 'Disponible' },
    { key: '2', producto: 'Mouse Logitech M185', sku: 'MOU-LOG-185', cantidad: 120, estado: 'Disponible' },
    { key: '3', producto: 'Teclado Mecánico RGB', sku: 'TEC-RGB-001', cantidad: 8, estado: 'Bajo' },
    { key: '4', producto: 'Monitor Samsung 27"', sku: 'MON-SAM-027', cantidad: 2, estado: 'Crítico' },
    { key: '5', producto: 'Auriculares Sony WH-1000XM4', sku: 'AUR-SON-XM4', cantidad: 35, estado: 'Disponible' },
    { key: '6', producto: 'Webcam Logitech C920', sku: 'WEB-LOG-C920', cantidad: 15, estado: 'Disponible' },
    { key: '7', producto: 'SSD Samsung 1TB', sku: 'SSD-SAM-1TB', cantidad: 5, estado: 'Bajo' },
    { key: '8', producto: 'Router TP-Link AX3000', sku: 'ROU-TPL-3000', cantidad: 22, estado: 'Disponible' },
  ];

  return (
    <div>
      <Title level={2}>Stock</Title>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default Stock;
