import { Select } from 'antd';

const { Option } = Select;

const SecondTab = () => {
  return (
    <div>
      <div>
        <Select
          defaultValue="Select Country"
          className="w-[200px]"
        >
          <Option value="uzbekistan">Uzbekistan</Option>
          <Option value="kazakhstan">Kazakhstan</Option>
          <Option value="kyrgyzstan">Kyrgyzstan</Option>
        </Select>
        <Select
          defaultValue="Select Country"
          className="w-[200px] ml-5"
        >
          <Option value="uzbekistan">Uzbekistan</Option>
          <Option value="kazakhstan">Kazakhstan</Option>
          <Option value="kyrgyzstan">Kyrgyzstan</Option>
        </Select>
        <Select
          defaultValue="Select Country"
          className="w-[200px] ml-5"
        >
          <Option value="uzbekistan">Uzbekistan</Option>
          <Option value="kazakhstan">Kazakhstan</Option>
          <Option value="kyrgyzstan">Kyrgyzstan</Option>
        </Select>
      </div>
    </div>
  )
}

export default SecondTab