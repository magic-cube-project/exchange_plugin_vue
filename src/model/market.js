import http from '../assets/js/portHttp';

export default {
  /* 获取币种行情详情 (页面头部信息) */
  getLatestMarketDetail: () => {
    return http.lulupost('getLatestMarket')
      .then((res) => {
        return Promise.resolve(res);
      });
  },
  /**
   * 获取K线数据
   * params
   * cotin: 币种类型
   * time: 时间段
   * timepspan : 时间间隔
   */
  getKlinesDetail: (time ,timespan) => {
    return http.lulupost('getkline', {start:parseInt(new Date().getTime() / 1000 - time), end: parseInt(new Date().getTime() / 1000), interval:timespan})
      .then((res) => {
          return Promise.resolve(res);
      });
  },

  getOpenId:(tel)=>{
    return http.lulupost('getUserOpenid',{tel:tel})
      .then((res) => {
        return Promise.resolve(res);
      });
  },

  createtoken:(openid,amount)=>{
    return http.lulupost('createtoken',{openid:openid,amount:amount})
      .then((res) => {
        return Promise.resolve(res);
      });
  },

  balance:(openid)=>{
    return http.lulupost('balance',{openid:openid})
      .then((res) => {
        return Promise.resolve(res);
      })
  },

  balance2:()=>{
    console.log(123);
  }

}
