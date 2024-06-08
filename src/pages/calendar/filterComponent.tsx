// import React from "react";
// import { Select } from "antd";
// import { RxReload } from "react-icons/rx";

// interface FilterComponentProps {
//   regionOptions: { value: number; label: string }[];
//   districtOptions: { value: number; label: string }[];
//   regionId: number | null;
//   districtId: number | null;
//   setRegionId: (value: number | null) => void;
//   setDistrictId: (value: number | null) => void;
//   getDistrict: ((districtId: number | null) => void) => void, regionId: number;
//   resetFilters: () => void;
// }

// const FilterComponent: React.FC<FilterComponentProps> = ({
//   regionOptions,
//   districtOptions,
//   regionId,
//   districtId,
//   setRegionId,
//   setDistrictId,
//   getDistrict,
//   resetFilters,
// }) => {
//   const handleRegionChange = (value: number) => {
//     setRegionId(value);
//     getDistrict(value, (districtId) => setDistrictId(districtId));
//   };

//   return (
//     <div className="grid grid-cols-2 items-center gap-5">
//       <Select
//         showSearch
//         placeholder="Регион"
//         optionFilterProp="children"
//         filterOption={(input, option) =>
//           (option?.label ?? "").includes(input)
//         }
//         filterSort={(optionA, optionB) =>
//           (optionA?.label ?? "")
//             .toLowerCase()
//             .localeCompare((optionB?.label ?? "").toLowerCase())
//         }
//         options={regionOptions}
//         value={regionId}
//         onChange={handleRegionChange}
//       />
//       <div className="flex gap-3 items-center w-full">
//         <Select
//           className="w-full"
//           showSearch
//           placeholder="Город"
//           optionFilterProp="children"
//           filterOption={(input, option) =>
//             (option?.label ?? "").includes(input)
//           }
//           filterSort={(optionA, optionB) =>
//             (optionA?.label ?? "")
//               .toLowerCase()
//               .localeCompare((optionB?.label ?? "").toLowerCase())
//           }
//           options={districtOptions}
//           value={districtId}
//           onChange={(value) => setDistrictId(value)}
//         />
//         <RxReload size={20} onClick={resetFilters} className="cursor-pointer" />
//       </div>
//     </div>
//   );
// };

// export default FilterComponent;
