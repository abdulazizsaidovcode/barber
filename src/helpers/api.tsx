// hamma qushimcha yullar xam uzi api url lar shu joyga yozamiz(mi) shunday qilib?
// +998886700770 12345
// http://45.67.35.86:8080/swagger-ui/index.html#/

// get me
import axios from 'axios';
import { config } from './token.tsx';

export const getMe = (token?: string) => {
  axios.get(`${base_url}user/me`, token ? {
    headers: {
      Authorization: `Bearer ${token}`
    }
  } : config)
    .then(res => {
      if (res.data.success === true) {
        sessionStorage.setItem('userInfo', JSON.stringify(res.data.body));
        sessionStorage.setItem('userId', res.data.body.id)
      }
    })
    .catch(() => console.log('user info error'));
};

// swagger url
const base_url: string = 'http://45.67.35.86:8080/';

// master url
export const master_url: string = `${base_url}user/web/masters-by-filter`;

// client url
export const client_url: string = `${base_url}client/web/clients-by-filter`;

//login url
export const login_url: string = `${base_url}auth/admin-login`;
export const get_orders_list: string = `${base_url}order/web`;

// settings url 
export const service_category_list: string = `${base_url}category`;
export const add_service_category: string = `${base_url}category/web`;
export const del_service_category: string = `${base_url}category/web`;
export const edit_service_category: string = `${base_url}category/web`;
export const add_precent_list: string = `${base_url}percent`;
export const precent_list: string = `${base_url}percent`;

export const chat_user_url: string = `${base_url}chat/support-service`;

export const calendar_url: string = `${base_url}dashboard/web/calendar`;
export const dashboard_url = `${base_url}dashboard/`;



//finance
export const finance_list = (month: string | null, year: number | null) => {
  if (month !== null && year !== null) return `${base_url}finance/web?month=${month}&year=${year}`;
  else if (month !== null && year === null) return `${base_url}finance/web?month=${month}`;
  else if (month === null && year !== null) return `${base_url}finance/web?month=${year}`;
  else return `${base_url}finance/web`;
};

// sock url
export const sockjs_url = `${base_url}ws`;