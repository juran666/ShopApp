import request from '@/utils/request'
// 更改密码
export const getAmend = (data: any) => request({ url: '/user/changePassword', method: 'POST', data })
//验证码
export const getMessage = (data: any) => request({ url: '/user/getMessage', method: 'POST', data })