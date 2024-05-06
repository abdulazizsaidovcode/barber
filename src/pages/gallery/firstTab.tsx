import { Input, Modal, Select } from 'antd';
import { useState } from 'react';

interface UserCardProps {
  image: string;
  name: string;
  phone: string;
}

const RirstTab = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImg, setSelectedImg] = useState('');

  const onSearch = (value: string) => {
    console.log(value);
  };

  const users: UserCardProps[] = [
    {
      image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      name: 'John Doe',
      phone: '+99890 123 4567',
    },
    {
      image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      name: 'Jane Smith',
      phone: '+99890 765 4321',
    },
    {
      image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      name: 'Alice Johnson',
      phone: '+99891 234 5678',
    },
  ];

  const showModal = (imgUrl: string) => {
    setSelectedImg(imgUrl);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { Search } = Input;

  return (
    <div>
      <div className="flex flex-wrap justify-between p-3 md:flex-row flex-col">
        <div className="mb-4 md:mb-0">
          <Search
            className="dark:bg-gray-700 bg-white"
            placeholder="Search by FIO"
            onSearch={onSearch}
            style={{ width: 300 }}
          />
        </div>
        <div className="mb-4 md:mb-0">
          <Select placeholder="Select country" style={{ width: 200 }} />
        </div>
        <div className="mb-4 md:mb-0">
          <Select placeholder="Select city" style={{ width: 200 }} />
        </div>
        <div>
          <Select placeholder="Service category" style={{ width: 200 }} />
        </div>
      </div>

      <div className="flex flex-col p-3 md:grid md:grid-cols-3  gap-4">
        {users.map((user, index) => (
          <div
            key={index}
            className="hover:shadow-lg p-2 bg-white dark:bg-gray-800 rounded-lg"
            onClick={() => showModal(user.image)}
          >
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              alt="Profile"
              src={user.image}
            />
            <div className="p-2">
              <div className="flex items-center justify-between">
                <h5 className="text-lg font-bold">{user.name}</h5>
                <div className="flex items-center justify-center px-1 rounded-lg bg-red-500 text-white">
                  New Image
                </div>
              </div>
              <p className="text-gray-500">{user.phone}</p>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title="Image Gallery"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <img alt="Expanded View" src={selectedImg} style={{ width: '100%' }} />
      </Modal>
    </div>
  );
};

export default RirstTab;
