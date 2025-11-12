import { Table, Typography, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title, Paragraph } = Typography;

interface DebtItem {
  key: string;
  proveedor: string;
  factura: string;
  vencimiento: string;
  monto: number;
  estado: string;
}

const Debts = () => {
  const columns: ColumnsType<DebtItem> = [
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
      render: (monto: number) => `$${monto.toLocaleString()}`,
      sorter: (a, b) => a.monto - b.monto,
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado: string) => {
        const color = estado === 'Al día' ? 'green' : estado === 'Próximo' ? 'orange' : 'red';
        return <Tag color={color}>{estado}</Tag>;
      },
    },
  ];

  const data: DebtItem[] = [
    { key: '1', proveedor: 'Distribuidora Tech', factura: 'PROV-001', vencimiento: '2024-02-15', monto: 28000, estado: 'Al día' },
    { key: '2', proveedor: 'Importaciones Global', factura: 'PROV-002', vencimiento: '2024-02-10', monto: 45000, estado: 'Próximo' },
    { key: '3', proveedor: 'Mayorista Central', factura: 'PROV-003', vencimiento: '2024-01-30', monto: 15500, estado: 'Vencida' },
    { key: '4', proveedor: 'Electrónica SA', factura: 'PROV-004', vencimiento: '2024-02-20', monto: 32000, estado: 'Al día' },
    { key: '5', proveedor: 'Tech Supplies', factura: 'PROV-005', vencimiento: '2024-02-08', monto: 19800, estado: 'Próximo' },
  ];

  return (
    <div>
      <Title level={2}>Cuentas por Pagar</Title>
      <Paragraph>
        Control de deudas con proveedores. Mantenga un seguimiento de las fechas de vencimiento y estados de pago.
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

export default Debts;
