import { useState } from 'react';
import { Menu, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const LanguageSelector = () => {
  const [language, setLanguage] = useState('English');

  const handleMenuClick = (e: any) => {
    setLanguage(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Uzbek">
        <img src="../../images/uzbekistan (1).png" alt="" />
        O'zbekcha
      </Menu.Item>
      <Menu.Item key="English">
        <span className="flag-icon flag-icon-us" /> English
      </Menu.Item>
      <Menu.Item key="Russian">
        <span className="flag-icon flag-icon-ru" /> Русский
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <GlobalOutlined /> {language} <GlobalOutlined />
      </a>
    </Dropdown>
  );
};

export default LanguageSelector;
