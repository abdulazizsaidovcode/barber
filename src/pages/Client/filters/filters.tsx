import React, { useState, useEffect } from "react";
import { Button, Col, DatePicker, Input, Row, Select } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import moment from "moment";
import MasterModal from "../client-modal.tsx";
import clientFilterStore from "../../../helpers/state_managment/client/clientFilterStore.tsx";
import { getClients } from "../../../helpers/api-function/client/client.tsx";
import { getDistrict } from "../../../helpers/api-function/master/master.tsx";

const { Option } = Select;

const Filters: React.FC = () => {
  const [showExtraFilters, setShowExtraFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    setClientFilterData,
    setClientTotalPage,
    setDistrictData,
    regionData,
    districtData,
  } = clientFilterStore();
  const [filters, setFilters] = useState({
    fullName: "",
    regionId: 0,
    districtId: 0,
    startDate: null,
    endDate: null,
    status: "",
  });

  const toggleExtraFilters = () => setShowExtraFilters(!showExtraFilters);
  const openModal = () => setIsModalOpen(!isModalOpen);

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

  const handleInputChange = (key: string, value: any) => {
    if (key === "startDate" || key === "endDate") {
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
      regionId: 0,
      districtId: 0,
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
              Select region
            </Option>
            {regionData.length > 0 ? (
              regionData.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))
            ) : (
              <Option disabled>No regions available</Option>
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
              Select district
            </Option>
            {districtData.length > 0 ? (
              districtData.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))
            ) : (
              <Option disabled>No districts available</Option>
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
            className="flex items-center justify-center"
            type="primary"
            onClick={toggleExtraFilters}
            style={styles.toggleButton}
          >
            {showExtraFilters ? <UpOutlined /> : <DownOutlined />}
          </Button>
          <Button style={styles.extraButton} onClick={openModal}>
            Download
          </Button>
          <MasterModal isModalOpen={isModalOpen} openModal={openModal} />
        </Col>
      </Row>

      {showExtraFilters && (
        <>
          <Row gutter={[16, 16]} style={{ marginTop: "10px" }}>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <DatePicker
                placeholder="Start date"
                style={styles.filterInput}
                value={filters.startDate ? moment(filters.startDate) : null}
                onChange={(date) => handleInputChange("startDate", date)}
              />
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <DatePicker
                placeholder="End date"
                style={styles.filterInput}
                value={filters.endDate ? moment(filters.endDate) : null}
                onChange={(date) => handleInputChange("endDate", date)}
              />
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Select
                placeholder="Status"
                style={styles.filterInput}
                value={filters.status || null}
                onChange={(value) => handleInputChange("status", value)}
              >
                <Option value="ACTIVE">ACTIVE</Option>
                <Option value="BLOCK">BLOCK</Option>
                <Option value="DELETED">DELETED</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Button style={styles.extraButton} onClick={resetFilters}>
                Reset
              </Button>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Filters;
