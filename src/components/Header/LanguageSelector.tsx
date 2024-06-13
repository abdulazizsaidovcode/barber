import { useState, useEffect } from 'react';
import { Menu, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import i18n from '../../i18n';

const LanguageSelector = () => {
  const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'English';
  };

  const [language, setLanguage] = useState(getInitialLanguage());

  useEffect(() => {
    changeLanguage(language);
  }, [language]);

  const handleMenuClick = (e: any) => {
    setLanguage(e.key);
    localStorage.setItem('language', e.key);
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language === 'English' ? 'en' : language === 'Uzbek' ? 'uz' : 'ru');
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
    <Dropdown overlay={menu} className="cursor-pointer">
      <a className="ant-dropdown-link flex gap-1" onClick={(e) => e.preventDefault()}>
        <GlobalOutlined /> {language}
      </a>
    </Dropdown>
  );
};

export default LanguageSelector;
