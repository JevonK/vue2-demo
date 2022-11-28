export const baseUrl = location.protocol + '//localhost'  //项目域名
const environment = process.env.NODE_ENV === 'production' ? 'pro' : 'dev' //dev开发环境  pro 生产环境

let exports = {}
// 开发环境
if(environment === 'dev'){
    exports['proxyBaseUrl'] = 'http://localhost:3000/'
// 线上环境
}else if(environment === 'pro'){
    exports['proxyBaseUrl'] = 'http://localhost:3000/'
}
export default exports