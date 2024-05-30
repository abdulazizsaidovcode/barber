// hamma qushimcha yullar xam uzi api url lar shu joyga yozamiz(mi) shunday qilib?
// +998886700770 12345
// http://45.67.35.86:8080/swagger-ui/index.html#/


// swagger url
const base_url: string = 'http://45.67.35.86:8080/'

//login url
export const login_url: string = `${base_url}auth/admin-login`
export const precent_list: string = `${base_url}percent`
export const add_precent_list: string = `${base_url}percent`

export const chat_user_url: string = `${base_url}chat/support-service`

// beautification jwt token
export const config = {
    headers: {Authorization: sessionStorage.getItem('jwtTokEn')}
};

export const setConfig = () => config.headers.Authorization = sessionStorage.getItem('jwtTokEn');

