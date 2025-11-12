import { Card, Row, Col, Statistic, Typography } from 'antd';
import { ShoppingOutlined, PercentageOutlined, BarChartOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Stats = () => {
  return (
    <div>
      <Title level={2}>Estadísticas</Title>
      <Paragraph>
        Análisis detallado del rendimiento del local. Métricas clave para la toma de decisiones.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12}>
          <Card>
            <Statistic
              title="Ticket Promedio"
              value={2845}
              prefix={<ShoppingOutlined />}
              suffix="ARS"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <Statistic
              title="Tasa de Conversión"
              value={68.5}
              prefix={<PercentageOutlined />}
              suffix="%"
              precision={1}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24}>
          <Card title="Ventas por Categoría">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 20px',
              color: '#999'
            }}>
              <div style={{ textAlign: 'center' }}>
                <BarChartOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                <Paragraph type="secondary">Gráfico de ventas por categoría</Paragraph>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Stats;
