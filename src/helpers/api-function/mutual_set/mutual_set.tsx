import axios from "axios";
import { config } from "../../token";
import { clearFunction } from "../../../common/clear-function/clear-function";

export const getMutuals = (url: string, setPage: (val: number) => void, setSize: (val: number) => void, setTotalElements: (val: number) => void, setData: (data: any[]) => void) => {
    axios
        .get(url, config)
        .then((res) => {
            if (res.data.success === true) {
                setData(res.data.body.object);
                setPage(res.data.body.page)
                setSize(res.data.body.size)
                setTotalElements(res.data.body.totalElements)
            } else {
                setData([]);
                clearFunction();
            }
        })
        .catch(() => {
            setData([]);
            clearFunction();
        });
};