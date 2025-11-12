import { useState } from 'react';
import { Button, Modal, List } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useLocation } from '../context/LocationContext';

const LocationSelector = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { selectedLocation, setSelectedLocation, locations } = useLocation();

  const handleLocationChange = (location: { id: string; name: string }) => {
    setSelectedLocation(location);
    setModalOpen(false);
  };

  return (
    <>
      <Button
        type="text"
        icon={<EnvironmentOutlined />}
        onClick={() => setModalOpen(true)}
        style={{
          width: '100%',
          textAlign: 'left',
          height: 'auto',
          padding: '12px 16px',
          marginBottom: 16
        }}
      >
        <div style={{ marginLeft: 8 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Local Actual</div>
          <div style={{ fontWeight: 500 }}>{selectedLocation.name}</div>
        </div>
      </Button>

      <Modal
        title="Seleccionar Local"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <List
          dataSource={locations}
          renderItem={(location) => (
            <List.Item
              onClick={() => handleLocationChange(location)}
              style={{
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              className="location-list-item"
            >
              <List.Item.Meta
                avatar={<EnvironmentOutlined />}
                title={location.name}
              />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};

export default LocationSelector;
