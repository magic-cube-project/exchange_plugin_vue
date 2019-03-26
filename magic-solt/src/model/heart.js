import HttpMgr from '../assets/js/HttpMgr';
import Config from '../assets/js/Config';

export default {

  /** 
   * 获取主播数据
   */
  getHeartRecord: ( sucfn, errfn, json, time ) => {
    HttpMgr.Get( Config.URL_LUCKY_COUNT, sucfn, errfn, "getHeartRecord", json, time );
  },

};