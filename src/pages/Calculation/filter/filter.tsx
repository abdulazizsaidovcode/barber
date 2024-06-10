import { DownOutlined, UpOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Input,
  Row,
  Select,
} from "antd";
import { Option } from "antd/es/mentions";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const FilterOrder: React.FC = () => {
  const [showExtraFilters, setShowExtraFilters] = useState(false);

  const toggleExtraFilters = () => setShowExtraFilters(!showExtraFilters);

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div>
      <Row gutter={[16, 16]} className="mb-2">
        <Col xs={24} sm={12} md={6} className="mb-4">
          <Input
            placeholder="Search by name"
            prefix={<IoSearchOutline />}
            className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
          />
        </Col>
        <Col xs={24} sm={12} md={6} className="mb-4">
          <Select
            defaultValue="Country"
            className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
          >
            <Option value="toshkent">Toshkent</Option>
            <Option value="qarshi">Qarshi</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6} className="mb-4">
          <Select
            defaultValue="2024"
            className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
            placeholder="Select Year"
          >
            <Option value="2024">2024</Option>
            <Option value="2023">2023</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6} className="mb-4 flex gap-4">
          <Button
            className="flex items-center justify-center bg-white w-full rounded-lg bg-gray-200 dark:bg-gray-800"
            onClick={toggleExtraFilters}
          >
            {showExtraFilters ? <UpOutlined /> : <DownOutlined />}
          </Button>
          <Button className="bg-gray-200 dark:bg-gray-800 rounded-lg bg-white">
            Download
          </Button>
        </Col>
      </Row>
      {showExtraFilters && (
        <Row gutter={[29, 16]} className="mb-2">
          <Col xs={14} sm={7} md={4} className="mb-4">
            <DatePicker
              onChange={onChange}
              className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
            />
          </Col>
          <Col xs={24} sm={12} md={6} className="mb-4">
            <Select
              defaultValue="Категория услуг"
              className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
            >
              <Option value="toshkent">100</Option>
              <Option value="qarshi">200</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6} className="mb-4">
            <Select
              defaultValue="Статус записи"
              className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
              placeholder="Tariff"
            >
              <Option value="Одобрена">Одобрена √</Option>
              <Option value="На_одобрении">На одобрении !</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={5} className="mb-4">
            <Select
              defaultValue="Статус записи"
              className="w-full rounded-lg bg-gray-800"
              placeholder="Tariff"
            >
              <Option value="Карта">Карта</Option>
              <Option value="Наличные">Наличные</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={3} className="mb-4">
            <Button className="bg-gray-200 dark:bg-gray-800 rounded-lg w-full  dark:text-white">
              Reset
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default FilterOrder;
