import React, { useState, useEffect } from "react";
import { Button, Col, DatePicker, Input, Row, Select } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import moment from "moment";
import clientFilterStore from "../../../helpers/state_managment/client/clientFilterStore.tsx";
import { getClients } from "../../../helpers/api-function/client/client.tsx";
import { getDistrict } from "../../../helpers/api-function/master/master.tsx";
import { useTranslation } from "react-i18next";
import { client_download } from "../../../helpers/api.tsx";
import { downloadExcelFile } from "../../../helpers/attachment/file-download.tsx";

const { Option } = Select;

const Filters: React.FC = () => {
  const { t } = useTranslation();
  const [showExtraFilters, setShowExtraFilters] = useState(false);
  const {
    setClientFilterData,
    setClientTotalPage,
    setDistrictData,
    regionData,
    districtData,
    setIsLoading,
    isLoading,
    page
  } = clientFilterStore();
  const [filters, setFilters] = useState({
    fullName: "",
    regionId: 0,
    districtId: null,
    startDate: null,
    endDate: null,
    status: "",
  });

  const toggleExtraFilters = () => setShowExtraFilters(!showExtraFilters);

  useEffect(() => {
    const params: any = {
      setData: setClientFilterData,
      setTotalPage: setClientTotalPage,
      ...filters,
    };

    // Remove empty filter values
    Object.keys(params).forEach((key) => {
      if (params[key] === "" || params[key] === null) {
        delete params[key];
      }
    });

    // Fetch clients data
    getClients(params);
  }, [filters]);

  useEffect(() => {
    filters.districtId = null
    const params: any = {
      setData: setClientFilterData,
      setTotalPage: setClientTotalPage,
      ...filters,
    };

    // Remove empty filter values
    Object.keys(params).forEach((key) => {
      if (params[key] === "" || params[key] === null) {
        delete params[key];
      }
    });

    // Fetch clients data
    getClients(params);
  }, [filters.regionId]);

  const handleInputChange = (key: string, value: any) => {
    if (key === "startDate" || key === "endDate") {
      value = value ? moment(value).format("YYYY-MM-DD") : null;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const queryParams: string = [
    filters.fullName ? `fullName=${filters.fullName}` : '',
    filters.regionId ? `regionId=${filters.regionId}` : 0,
    filters.districtId ? `districtId=${filters.districtId}` : 0,
    filters.startDate ? `startDate=${filters.startDate}` : null,
    filters.endDate ? `endDate=${filters.endDate}` : null,
    filters.status ? `status=${filters.status}` : '',
  ].filter(Boolean).join('&');
  const url: string = `${client_download}?${queryParams}&page=${page}&size=10`;



  const resetFilters = () => {
    setFilters({
      fullName: "",
      regionId: 0,
      districtId: null,
      startDate: null,
      endDate: null,
      status: "",
    });
  };

  const styles = {
    mainContainer: {
      padding: "0 30px",
      marginBottom: "20px",
    },
    filterGroup: {
      marginBottom: "16px",
    },
    filterTitle: {
      marginBottom: "5px",
      fontWeight: "bold",
    },
    filterInput: {
      width: "100%",
      backgroundColor: "#fff",
      borderRadius: "8px",
    },
    toggleButton: {
      width: "13%",
      backgroundColor: "#f0f0f0",
    },
    extraButton: {
      backgroundColor: "#f0f0f0",
    },
  };

  return (
    <div style={styles.mainContainer}>
      <Row gutter={[16, 16]} style={{ marginTop: "1rem" }}>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Input
            placeholder="Search F.I.O"
            prefix={<IoSearchOutline />}
            style={styles.filterInput}
            value={filters.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Select
            placeholder="Region"
            style={styles.filterInput}
            value={filters.regionId || 0}
            onChange={(value) => {
              handleInputChange("regionId", value);
              getDistrict(setDistrictData, value);
            }}
          >
            <Option value={0} disabled>
              {t("Select_region")}
            </Option>
            {regionData.length > 0 ? (
              regionData.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))
            ) : (
              <Option disabled>{t("No_regions_available")}</Option>
            )}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Select
            placeholder="District"
            style={styles.filterInput}
            value={filters.districtId || 0}
            onChange={(value) => handleInputChange("districtId", value)}
          >
            <Option value={0} disabled>
              {t("Select_district")}
            </Option>
            {districtData.length > 0 ? (
              districtData.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))
            ) : (
              <Option disabled>{t("No_districts_available")}</Option>
            )}
          </Select>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={6}
          style={styles.filterGroup}
          className="flex gap-4"
        >
          <Button
            className="flex items-center justify-center bg-white px-5 rounded-lg bg-gray-200 dark:bg-gray-800"
            onClick={toggleExtraFilters}
          >
            {showExtraFilters ? <UpOutlined /> : <DownOutlined />}
          </Button>
          <Button
            className={"bg-gray-200 dark:bg-gray-800 rounded-lg text-xs dark:text-white"}
            onClick={() => downloadExcelFile(url, setIsLoading, page)}
          >
            {isLoading ? 'loading...' : 'Download'}
          </Button>
        </Col>
      </Row>

      {showExtraFilters && (
        <>
          <Row gutter={[16, 16]} style={{ marginTop: "10px" }}>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <DatePicker
                placeholder={t("Select_start_date")}
                style={styles.filterInput}
                onChange={(date) => handleInputChange("startDate", date)}
              />
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <DatePicker
                placeholder={t("Select_end_date")}
                style={styles.filterInput}
                onChange={(date) => handleInputChange("endDate", date)}
              />
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Select
                placeholder={t("Status")}
                style={styles.filterInput}
                value={filters.status || null}
                onChange={(value) => handleInputChange("status", value)}
              >
                <Option value="ACTIVE">{t("Active")}</Option>
                <Option value="BLOCK">{t("Locked")}</Option>
                <Option value="DELETED">{t("Deleted")}</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Button className="bg-gray-200 dark:bg-gray-800 rounded-lg text-xs dark:text-white" onClick={resetFilters}>
                {t("Reset")}
              </Button>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Filters;
