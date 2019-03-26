import http from '../assets/js/portHttp';

export default {
  /**
   * 获取用户信息
   * params
   * token: 用户登录凭证 放在请求头中
   */
  getUserInfo: () => {
    return http.lulupost('player/award/record').then(res => {
      return Promise.resolve(res)
    })
  },
  /**
   * 兑换魔法石
   * params
   * token: 用户登录凭证 放在请求头中
   * quota: 兑换数量
   */
  exchangeMagicStone: (quota) => {
    return http.lulupost('player/award/transform',{quota: quota}).then(res => {
      return Promise.resolve(res)
    })
  },
  /**
   * 提现
   * params
   * quota: 提现额度
   * alipay: 支付宝账号
   * name: 用户名
   */
  castOut: (quota, alipay, name) => {
    return http.lulupost('player/award/withdraw', {quota: quota ,alipay: alipay, name: name}).
    then(res => {
      return Promise.resolve(res)
    })
  },
   /**
   * 获取用户token
   * params
   * secret: 随机字符串
   * phone: 手机号码
   */
  getUserToken: (phone) => {
    return http.lulupost('clover/exchange/logindanger', {secret: 'mgajdjk3k4jdejsdfs' ,phone: phone}).
    then(res => {
      return Promise.resolve(res)
    })
  },
  /**
   * 获取用户exchangeId
   * params
   * phone: 手机号码
   */
  getExchangeId: (phone) => {
    return http.lulupost('clover/user/getExchangeid', {phone: phone}).
    then(res => {
      return Promise.resolve(res)
    })
  },
   /**
   * 确认token
   * params
   * phone: 手机号码
   */
  checkUserToken: (token) => {
    return http.lulupost('player/user/loginToken',{token,token}).
    then(res => {
      return Promise.resolve(res)
    })
  }
  
}
