import axios from "axios";
import { client_url } from "../../api.tsx";
import { config } from "../../token.tsx";
import { FilterData } from "../../state_managment/client/clientFilterStore.tsx";

interface IClient {
  fullName?: string;
  regionId?: string;
  districtId?: string;
  startDate?: string;
  endDate?: string;
  categoryId?: string;
  status?: string;
  selfEmployed?: boolean;
  workPlace?: string;
  page?: number;
  size?: number;
  setData: (val: FilterData[]) => void;
  setTotalPage: (val: number) => void;
}

export const getClients = ({
  fullName,
  regionId,
  districtId,
  startDate,
  endDate,
  categoryId,
  status,
  selfEmployed,
  workPlace,
  page,
  size,
  setData,
  setTotalPage,
}: IClient) => {
  axios
    .get(
      `${client_url}?${fullName ? `fullName=${fullName}&` : ""}${
        regionId ? `regionId=${regionId}&` : ""
      }${districtId ? `districtId=${districtId}&` : ""}${
        startDate ? `startDate=${startDate}&` : ""
      }${endDate ? `endDate=${endDate}&` : ""}${
        categoryId ? `categoryId=${categoryId}&` : ""
      }${status ? `status=${status}&` : ""}${
        selfEmployed ? `selfEmployed=${selfEmployed}&` : ""
      }${workPlace ? `workPlace=${workPlace}&` : ""}${page ? `page=${page}&` : ""}${size ? `size=${size}` : ""}`,
      config
    )
    .then((res) => {
      if (res.data.success === true) {
        setData(res.data.body.object);
        setTotalPage(res.data.body.totalElements);
      } else setData([]);
    })
    .catch(() => setData([]));
};
