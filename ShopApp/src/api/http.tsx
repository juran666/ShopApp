import request from '@/utils/request'
// 一级分类
export const getTFList = () => request({ url:'/type/getParentName', method: 'POST', })
export const getRegister = (data: any) => request({ url: '/user/login', method: 'POST', data })
// 一级列表
export const getTypeOneList = (data: any) => request({ url: "/type/getproduct", method: 'POST', data })
