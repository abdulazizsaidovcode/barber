import axios from 'axios';
import { dashboard_url } from '../../api.tsx';
import { config } from '../../token.tsx';
import { Data } from '../../state_managment/dashboard/dashboardStore.tsx';
import { clearFunction } from '../../../common/clear-function/clear-function.tsx';


interface DGeneralIndecator {
    year?: string;
    localDate?: string;
    starDate?: string;
    endDate?: string;
    setDashdata: (val: Data[]) => void;
}


export const DGeneralIndecators = ({ year, localDate, starDate, endDate, setDashdata }: DGeneralIndecator) => {
    

    axios.get(`${dashboard_url}web/statistic${year ? `?year=${year}` : "?year=0"}${localDate ? `&localDate=${localDate}` : ""}${starDate ? `&starDate=${starDate}` : ""}${endDate ? `&endDate=${endDate}` : ""}`, config)
        .then((response) => {
            setDashdata(response.data.body);
        })
        .catch(() => {
            console.error('There was an error fetching the data!');
            clearFunction()
        });
};
