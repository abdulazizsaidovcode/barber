// hamma qushimcha yullar xam uzi api url lar shu joyga yozamiz(mi) shunday qilib?
// +998886700770 12345
// http://45.67.35.86:8080/swagger-ui/index.html#/

// get me
import axios from 'axios';
import { config } from './token.tsx';

export const getMe = () => {
  axios.get(`${base_url}user/me`, config)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
};

// swagger url
const base_url: string = 'http://45.67.35.86:8080/';

//login url
export const service_category_list: string = `${base_url}category`;
export const login_url: string = `${base_url}auth/admin-login`;
export const precent_list: string = `${base_url}percent`;
export const add_precent_list: string = `${base_url}percent`;
export const get_orders_list: string = `${base_url}order/web`;

export const chat_user_url: string = `${base_url}chat/support-service`;

export const calendar_url: string = `${base_url}dashboard/web/calendar`;

export const dashboard_url = (year: number) => {
    return `${base_url}dashboard/web/statistic?year=${year}`
}

//finance
export const finance_list = (month: string | null, year: number | null) => {
  if (month !== null && year !== null) return `${base_url}finance/web?month=${month}&year=${year}`;
  else if (month !== null && year === null) return `${base_url}finance/web?month=${month}`;
  else if (month === null && year !== null) return `${base_url}finance/web?month=${year}`;
  else return `${base_url}finance/web`;
};