import { Table, Typography, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title, Paragraph } = Typography;

interface BillingItem {
  key: string;
  id: string;
  cliente: string;
  fecha: string;
  monto: number;
  estado: string;
}

const Billing = () => {
  const columns: ColumnsType<BillingItem> = [
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
      render: (monto: number) => `$${monto.toLocaleString()}`,
      sorter: (a, b) => a.monto - b.monto,
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado: string) => {
        const color = estado === 'Pagada' ? 'green' : estado === 'Pendiente' ? 'orange' : 'red';
        return <Tag color={color}>{estado}</Tag>;
      },
    },
  ];

  const data: BillingItem[] = [
    { key: '1', id: 'FAC-2024-001', cliente: 'Tech Solutions SA', fecha: '2024-01-15', monto: 45000, estado: 'Pagada' },
    { key: '2', id: 'FAC-2024-002', cliente: 'Distribuidora Central', fecha: '2024-01-18', monto: 32500, estado: 'Pagada' },
    { key: '3', id: 'FAC-2024-003', cliente: 'Comercial Sur', fecha: '2024-01-22', monto: 18900, estado: 'Pendiente' },
    { key: '4', id: 'FAC-2024-004', cliente: 'Sistemas Integrados', fecha: '2024-01-25', monto: 67000, estado: 'Pagada' },
    { key: '5', id: 'FAC-2024-005', cliente: 'Digital Store', fecha: '2024-01-28', monto: 12300, estado: 'Vencida' },
    { key: '6', id: 'FAC-2024-006', cliente: 'Mayorista Express', fecha: '2024-02-02', monto: 54800, estado: 'Pendiente' },
  ];

  return (
    <div>
      <Title level={2}>Facturación</Title>
      <Paragraph>
        Gestión completa de facturas emitidas. Visualice el estado de pagos, montos pendientes y facturas vencidas.
      </Paragraph>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
        style={{ marginTop: 24 }}
      />
    </div>
  );
};

export default Billing;
