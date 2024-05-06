import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { FaArrowRightToBracket } from 'react-icons/fa6';

const { confirm } = Modal;

const Logout = () => {
  // Function to show confirmation dialog
  const showConfirm = () => {
    confirm({
      title: 'Do you really want to log out?',
      icon: <ExclamationCircleOutlined />,
      content: 'Confirm to proceed with logging out.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // Here you would handle the logout logic
        console.log('Logged out');
      },
      onCancel() {
        console.log('Logout cancelled');
      },
    });
  };

  return (
    <div>
      <Button
        className="bg-[#646262] text-white p-2 rounded-lg flex items-center gap-3 dark:bg-[#9c0a36] lg:px-5"
        onClick={showConfirm}
      >
        Log Out
        <FaArrowRightToBracket />
      </Button>
    </div>
  );
};

export default Logout;
