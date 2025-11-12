import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title, Paragraph } = Typography;

interface ProviderItem {
  key: string;
  nombre: string;
  contacto: string;
  email: string;
  rubro: string;
}

const Providers = () => {
  const columns: ColumnsType<ProviderItem> = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Contacto',
      dataIndex: 'contacto',
      key: 'contacto',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rubro',
      dataIndex: 'rubro',
      key: 'rubro',
    },
  ];

  const data: ProviderItem[] = [
    { key: '1', nombre: 'Distribuidora Tech', contacto: '+54 11 4567-8901', email: 'ventas@disttech.com', rubro: 'Computación' },
    { key: '2', nombre: 'Importaciones Global', contacto: '+54 11 4567-8902', email: 'info@impglobal.com', rubro: 'Electrónica' },
    { key: '3', nombre: 'Mayorista Central', contacto: '+54 11 4567-8903', email: 'contacto@mayorista.com', rubro: 'General' },
    { key: '4', nombre: 'Electrónica SA', contacto: '+54 11 4567-8904', email: 'ventas@electronicasa.com', rubro: 'Electrónica' },
    { key: '5', nombre: 'Tech Supplies', contacto: '+54 11 4567-8905', email: 'info@techsupplies.com', rubro: 'Accesorios' },
    { key: '6', nombre: 'Periféricos Pro', contacto: '+54 11 4567-8906', email: 'ventas@perifericospro.com', rubro: 'Periféricos' },
  ];

  return (
    <div>
      <Title level={2}>Proveedores</Title>
      <Paragraph>
        Directorio completo de proveedores. Acceda a información de contacto y categorías de productos.
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

export default Providers;
