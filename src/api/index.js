import config from '../config.js' // 基础路径
import service from '../plugins/service.js' //封装的axios
import Qs from 'qs'
/**
 * 公司列表
 */
export const customerList = (data)=> service({
  url: `${config.proxyBaseUrl}base/customers/get_list`,
  method: 'GET',
  params: data,
})
// 公司删除
export const customerDel = (data)=> service({
  url: `${config.proxyBaseUrl}base/customers/del`,
  method: 'GET',
  params: data,
})

// 获取跟进人员
export const adminList = (data)=> service({
    url: `${config.proxyBaseUrl}base/admins/get_list`,
    method: 'GET',
    params: data,
  })
// 保存或修改公司信息
export const customerSave = (data)=> service({
    url: `${config.proxyBaseUrl}base/customers/save`,
    method: 'post',
    data: Qs.stringify(data),
  })

  // 获取客户信息
export const customerInfo = (data)=> service({
    url: `${config.proxyBaseUrl}base/customers/show`,
    method: 'GET',
    params: data,
  })

    // 获取联系列表
export const contactList = (data)=> service({
    url: `${config.proxyBaseUrl}base/customer_contacts/get_list`,
    method: 'GET',
    params: data,
  })

// 获取跟进列表
export const followList = (data)=> service({
    url: `${config.proxyBaseUrl}base/customer_follows/get_list`,
    method: 'GET',
    params: data,
  })

// 批量完成跟进记录
export const followStatus = (data)=> service({
    url: `${config.proxyBaseUrl}base/customer_follows/edit_status`,
    method: 'post',
    data: Qs.stringify(data),
  })

  // 获取跟进列表
export const followDel = (data)=> service({
    url: `${config.proxyBaseUrl}base/customer_follows/del`,
    method: 'GET',
    params: data,
  })

  // 批量完成跟进记录
export const contactsSave = (data)=> service({
    url: `${config.proxyBaseUrl}base/customer_contacts/save`,
    method: 'post',
    data: Qs.stringify(data),
  })

   // 创建或修改跟进记录
export const followsSave = (data)=> service({
    url: `${config.proxyBaseUrl}base/customer_follows/save`,
    method: 'post',
    data: Qs.stringify(data),
  })