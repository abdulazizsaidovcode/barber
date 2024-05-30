// hamma qushimcha yullar xam uzi api url lar shu joyga yozamiz(mi) shunday qilib?
// +998886700770 12345
// http://45.67.35.86:8080/swagger-ui/index.html#/

// swagger url
const base_url: string = 'http://45.67.35.86:8080/';

//login url
export const service_category_list: string = `${base_url}category`
export const login_url: string = `${base_url}auth/admin-login`;
export const precent_list: string = `${base_url}percent`;
export const add_precent_list: string = `${base_url}percent`;
export const get_orders_list: string = `${base_url}order/web`;

export const chat_user_url: string = `${base_url}chat/support-service`

export const calendar_url: string = `${base_url}dashboard/web/calendar`


//finance
export const finance_list = (month: number, year: number) => {
 return `${base_url}finance/web?month=${month}&year=${year}`
}