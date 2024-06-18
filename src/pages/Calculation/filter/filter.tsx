import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Input, Row, Select } from "antd";
import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import moment from "moment";
import orderStore from "../../../helpers/state_managment/order/orderStore";
import { getOrder } from "../../../helpers/api-function/order/orderFunction";
import { getDistrict } from "../../../helpers/api-function/master/master";
import { order_download } from "../../../helpers/api";
import { downloadExcelFile } from "../../../helpers/attachment/file-download";
import { useTranslation } from "react-i18next";

const FilterOrder: React.FC = () => {
  const [showExtraFilters, setShowExtraFilters] = useState(false);
  const { t } = useTranslation()
  const {
    regionData,
    setData,
    districtData,
    statusO,
    setTotalPage,
    setDistrictData,
    childCategory,
    setIsLoading,
    isLoading,
    page,
  } = orderStore();

  const [filters, setFilters] = useState({
    fullName: "",
    regionId: null,
    districtId: null,
    orderDate: null,
    categoryId: null,
    orderStatus: null,
    paymentType: null,
  });

  const toggleExtraFilters = () => setShowExtraFilters(!showExtraFilters);

  useEffect(() => {
    const params: any = {
      status: statusO,
      setData: setData,
      setTotalPage: setTotalPage,
      ...filters,
    };
    // Remove empty filter values
    Object.keys(params).forEach((key) => {
      if (
        params[key] === "" ||
        params[key] === null ||
        params[key] === 0 ||
        params[key] === "0"
      ) {
        delete params[key];
      }
    });

    // Fetch clients data
    getOrder(params);
    if (filters.regionId) getDistrict(setDistrictData, +filters.regionId);
  }, [filters]);

  useEffect(() => {
    filters.districtId = null
    const params: any = {
      status: statusO,
      setData: setData,
      setTotalPage: setTotalPage,
      ...filters,
    };
    // Remove empty filter values
    Object.keys(params).forEach((key) => {
      if (
        params[key] === "" ||
        params[key] === null ||
        params[key] === 0 ||
        params[key] === "0"
      ) {
        delete params[key];
      }
    });

    // Fetch clients data
    getOrder(params);
    
  }, [filters.regionId]);

  


  const queryParams: string = [
    filters.fullName ? `fullName=${filters.fullName}` : "",
    filters.regionId ? `regionId=${filters.regionId}` : 0,
    filters.districtId ? `districtId=${filters.districtId}` : 0,
    filters.orderDate ? `orderDate=${filters.orderDate}` : null,
    filters.paymentType ? `paymentType=${filters.paymentType}` : 0,
    filters.orderStatus ? `orderStatus=${filters.orderStatus}` : 0,
    filters.categoryId ? `categoryId=${filters.categoryId}` : 0,
  ]
    .filter(Boolean)
    .join("&");
  const url: string = `${order_download}?status=${statusO}${queryParams ? "&" : ""
    }${queryParams}&page=${page}&size=10`;

  const handleInputChange = (key: string, value: any) => {
    if (key === "orderDate") {
      value = value ? moment(value).format("YYYY-MM-DD") : null;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      fullName: "",
      regionId: null,
      districtId: null,
      orderDate: null,
      categoryId: null,
      orderStatus: null,
      paymentType: null,
    });
  };

  return (
    <div>
      <Row gutter={[16, 16]} className="mb-2">
        {/* fullName */}
        <Col xs={24} sm={12} md={6} className="mb-4">
          <Input
            placeholder={t("Search_by_fullname")}
            prefix={<IoSearchOutline />}
            className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
            value={filters.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
          />
        </Col>
        {/* regionId */}
        <Col xs={24} sm={12} md={6} className="mb-4">
          <Select
            placeholder="Region"
            value={filters.regionId || null}
            allowClear
            className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
            onChange={(value) => {
              handleInputChange("regionId", value);
            }}
          >
            {regionData.length !== null && (
              regionData.map((region) => (
                <Select.Option key={region.id} value={region.id}>
                  {region.name}
                </Select.Option>
              ))
            )}
          </Select>
        </Col>
        {/* districtId */}
        <Col xs={24} sm={12} md={6} className="mb-4">
          <Select
            placeholder="City"
            allowClear
            value={filters.districtId || null}
            className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
            onChange={(value) => handleInputChange("districtId", value)}
          >
            {districtData.length !== null && (
              districtData.map((district) => (
                <Select.Option key={district.id} value={district.id}>
                  {district.name}
                </Select.Option>
              ))
            )}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6} className="mb-4 flex gap-4">
          <Button
            className="flex items-center justify-center bg-white px-5 rounded-lg bg-gray-200 dark:bg-gray-800"
            onClick={toggleExtraFilters}
          >
            {showExtraFilters ? <UpOutlined /> : <DownOutlined />}
          </Button>
          <Button
            className={`bg-gray-200 dark:bg-gray-800 rounded-lg text-xs dark:text-white`}
            onClick={() => downloadExcelFile(url, setIsLoading, t("File_downloaded_successfully"), t("There_was_an_error_fetching_the_data"), page)}
          >
            {isLoading ? t("Loading") : t("Download")}
          </Button>
        </Col>
      </Row>
      {showExtraFilters && (
        <Row gutter={[29, 16]} className="mb-2">
          {/* orderDate */}
          <Col xs={14} sm={7} md={4} className="mb-4">
            <DatePicker
              onChange={(date) => handleInputChange("orderDate", date)}
              className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
            />
          </Col>
          {/* categoryId */}
          <Col xs={24} sm={12} md={6} className="mb-4">
            <Select
              placeholder="Service Category"
            allowClear
              className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
              value={filters.categoryId || null}
              onChange={(value) => handleInputChange("categoryId", value)}
            >
              {childCategory.length !== null && (
                childCategory.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))
              )}
            </Select>
          </Col>
          {/* orderStatus */}
          <Col xs={24} sm={12} md={6} className="mb-4">
            <Select
              placeholder="Order status"
            allowClear
            value={filters.orderStatus || null}
              className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
              onChange={(value) => handleInputChange("orderStatus", value)}
            >
              <Select.Option value="CONFIRMED">{t("detail_type")}</Select.Option>
              <Select.Option value="WAIT">{t("On_approval")}</Select.Option>
            </Select>
          </Col>
          {/* paymentType */}
          <Col xs={24} sm={12} md={5} className="mb-4">
            <Select
            placeholder="Payment type"
            allowClear
            value={filters.paymentType || null}
              className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
              onChange={(value) => handleInputChange("paymentType", value)}
            >
              <Select.Option value="CLICK">{t("Click")}</Select.Option>
              <Select.Option value="CASH">{t("Cash")}</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={3} className="mb-4">
            <Button
              className="bg-gray-200 dark:bg-gray-800 rounded-lg w-full text-xs dark:text-white"
              onClick={resetFilters}
            >
              {t("Reset")}
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default FilterOrder;
