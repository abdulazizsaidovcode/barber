import axios from 'axios';
import { client_url } from '../../api.tsx';
import { config } from '../../token.tsx';
import { Data } from '../../state_managment/client/clientstore.tsx';

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
    setData: (val: Data[]) => void;
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
    page = 0,
    size = 10,
    setData,
    setTotalPage
}: IClient) => {
    axios.get(`${client_url}?${fullName ? `fullName=${fullName}&` : ''}${regionId ? `regionId=${regionId}&` : ''}${districtId ? `districtId=${districtId}&` : ''}${startDate ? `startDate=${startDate}&` : ''}${endDate ? `endDate=${endDate}&` : ''}${categoryId ? `categoryId=${categoryId}&` : ''}${status ? `status=${status}&` : ''}${selfEmployed ? `selfEmployed=${selfEmployed}&` : ''}${workPlace ? `workPlace=${workPlace}&` : ''}page=${page}&size=${size}`, config)
        .then(res => {
            if (res.data.success === true) {
                setData(res.data.body.object)
                setTotalPage(res.data.body.totalPage)
            } else setData([])
        })
        .catch(() => setData([]));
};