import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title, Paragraph } = Typography;

interface CustomerItem {
  key: string;
  nombre: string;
  email: string;
  ultimaCompra: string;
  totalGastado: number;
}

const Customers = () => {
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
  ];

  const data: CustomerItem[] = [
    { key: '1', nombre: 'Martín Rodríguez', email: 'martin.r@email.com', ultimaCompra: '2024-02-01', totalGastado: 125000 },
    { key: '2', nombre: 'Sofía Gutiérrez', email: 'sofia.g@email.com', ultimaCompra: '2024-01-28', totalGastado: 89000 },
    { key: '3', nombre: 'Pablo Díaz', email: 'pablo.d@email.com', ultimaCompra: '2024-01-25', totalGastado: 156000 },
    { key: '4', nombre: 'Lucía Torres', email: 'lucia.t@email.com', ultimaCompra: '2024-02-03', totalGastado: 45000 },
    { key: '5', nombre: 'Fernando Castro', email: 'fernando.c@email.com', ultimaCompra: '2024-01-30', totalGastado: 203000 },
    { key: '6', nombre: 'Valentina Ruiz', email: 'valentina.r@email.com', ultimaCompra: '2024-02-02', totalGastado: 67000 },
    { key: '7', nombre: 'Mateo Silva', email: 'mateo.s@email.com', ultimaCompra: '2024-01-22', totalGastado: 34000 },
    { key: '8', nombre: 'Camila Morales', email: 'camila.m@email.com', ultimaCompra: '2024-02-04', totalGastado: 98000 },
  ];

  return (
    <div>
      <Title level={2}>Clientes</Title>
      <Paragraph>
        Base de datos de clientes. Acceda al historial de compras y valor total de cada cliente.
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

export default Customers;
