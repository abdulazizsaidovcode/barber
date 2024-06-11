// hamma qushimcha yullar xam uzi api url lar shu joyga yozamiz(mi) shunday qilib?
// +998886700770 123
// http://45.67.35.86:8080/swagger-ui/index.html#/

// get me
import axios from 'axios';
import { config } from './token.tsx';

export const getMe = (token?: string) => {
  axios
    .get(
      `${base_url}user/me`,
      token
        ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        : config,
    )
    .then((res) => {
      if (res.data.success === true) {
        sessionStorage.setItem('userInfo', JSON.stringify(res.data.body));
        sessionStorage.setItem('userId', res.data.body.id);
      }
    })
    .catch(() => console.log('user info error'));
};

// swagger url
export const base_url: string = 'http://45.67.35.86:8080/';

export const master_download: string = `${base_url}user/web/masters/download`;

// get region url
export const region_url: string = `${base_url}region`;
export const district_url: string = `${base_url}district`;

// child category list url
export const child_category_list: string = `${base_url}category/child`;

// master url
export const master_url: string = `${base_url}user/web/masters-by-filter`;
export const update_master_status: string = `${base_url}user/web/master-edit-status`;

// help url
export const help_url: string = `${base_url}help`;

// client url
export const client_url: string = `${base_url}client/web/clients-by-filter`;

//login url
export const login_url: string = `${base_url}auth/admin-login`;

// order url
export const get_orders_list: string = `${base_url}order/web`;

// settings url
export const service_category_list: string = `${base_url}category`;
export const add_service_category: string = `${base_url}category/web`;
export const del_service_category: string = `${base_url}category/web`;
export const edit_service_category: string = `${base_url}category/web`;
export const add_precent_list: string = `${base_url}percent`;
export const precent_list: string = `${base_url}percent`;
export const master_full_data: string = `${base_url}user/web/master-full-info`;
export const client_full_data: string = `${base_url}client/web/`;
export const master_service_id: string = `${base_url}service/web/`;
export const master_gallery_id: string = `${base_url}gallery/web/`;
export const chat_user_url: string = `${base_url}chat/support-service`;
export const calendar_url: string = `${base_url}workday/time/web/calendar`;
export const dashboard_url = `${base_url}dashboard/`;
export const client_block_put = `${base_url}client/is-block-from-master`;
export const client_send_message = `${base_url}message/for/client/by/admin`;

//finance client_send_message
export const finance_list = (month: string | null, year: number | null) => {
  if (month !== null && year !== null)
    return `${base_url}finance/web?month=${month}&year=${year}`;
  else if (month !== null && year === null)
    return `${base_url}finance/web?month=${month}`;
  else if (month === null && year !== null)
    return `${base_url}finance/web?month=${year}`;
  else return `${base_url}finance/web`;
};

export const finance_Destrictlist_Url = (destrict: string, month: string | null, year: number | null) => {
  console.log(destrict,month,year);
  
  if (destrict && month !== null && year !== null)
    return `${base_url}finance/web/${destrict}?month=${month}&year=${year}`;
  if (destrict && month !== null)
    return `${base_url}finance/web/${destrict}?month=${month}`;
  else if (destrict !== null && year !== null)
    return `${base_url}finance/web/${destrict}?year=${month}`;
  else if (month === null && year !== null)
    return `${base_url}finance/web/${destrict}?month=${year}`;
  else return `${base_url}finance/web/${destrict}`;
};

// sock url
export const sockjs_url = `${base_url}ws`;
export const newChat_url = `${base_url}chat/web/nachat-chat/send`; // sent message

// help url
export const getChatList_url = `${base_url}chat/web`; // get chat list

// help url
export const tarif_url = `${base_url}tariff/web/list`;
export const tarif_add_url = `${base_url}tariff/web`;
export const tarif_detail = `${base_url}tariff/web`;
export const tarif_put_url = `${base_url}tariff/web`;
// get attachment by id

export const getFileId = `${base_url}attachment/getFile/`; // get chat list
export const postFileId = `${base_url}attachment/upload`; // get chat list
export const postFilelist = `${base_url}attachment/upload/list`; // get chat list

export const newsletters_url = `${base_url}newsletters`; // newsletters url
export const messages_url = `${base_url}chat/messages`; // newsletters url

// requestes url
export const new_masters_url = `${base_url}user/web/new-master`; // newsletters url
export const masters_fulldata_url = `${base_url}user/web/master-full-info`;
export const masters_gallery_url = `${base_url}gallery/web`;
export const masters_service_url = `${base_url}service/web`;
export const masters_confirm_url = `${base_url}user/web/master-confirm`;
export const new_foto_url = `${base_url}gallery/web/new`;
