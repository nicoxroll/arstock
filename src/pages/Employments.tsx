import { Table, Typography, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title, Paragraph } = Typography;

interface EmploymentItem {
  key: string;
  nombre: string;
  puesto: string;
  email: string;
  estado: string;
}

const Employments = () => {
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
  ];

  const data: EmploymentItem[] = [
    { key: '1', nombre: 'Juan Pérez', puesto: 'Gerente', email: 'juan.perez@arstock.com', estado: 'Activo' },
    { key: '2', nombre: 'María García', puesto: 'Vendedora', email: 'maria.garcia@arstock.com', estado: 'Activo' },
    { key: '3', nombre: 'Carlos López', puesto: 'Encargado de Stock', email: 'carlos.lopez@arstock.com', estado: 'Activo' },
    { key: '4', nombre: 'Ana Martínez', puesto: 'Vendedora', email: 'ana.martinez@arstock.com', estado: 'Vacaciones' },
    { key: '5', nombre: 'Roberto Sánchez', puesto: 'Cajero', email: 'roberto.sanchez@arstock.com', estado: 'Activo' },
    { key: '6', nombre: 'Laura Fernández', puesto: 'Contadora', email: 'laura.fernandez@arstock.com', estado: 'Activo' },
    { key: '7', nombre: 'Diego Romero', puesto: 'Vendedor', email: 'diego.romero@arstock.com', estado: 'Inactivo' },
  ];

  return (
    <div>
      <Title level={2}>Empleados</Title>
      <Paragraph>
        Gestión del personal del local. Visualice información de contacto y estado laboral de cada empleado.
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

export default Employments;
