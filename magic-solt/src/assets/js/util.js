/**
 *  通用工具文件
 */
class Util {
  constructor () { // 当前文档body体宽度
    // cdn资源地址
    this.cdnResUrl = 'https://cdn.mofangvr.com/h5/';
    this.resUrl = 'https://release.mofangvr.com/assets/';
  }

  /**
    *   断链深copy简单对象
    */
  makeNewSelf (self) {
    return JSON.parse(JSON.stringify(self));
  }

  /**
    *   解析url参数
    *   @param {String} url
    *   @return {String | Array}
    */
  parseUrl (url) {
    if (!url) return '';
    url = url.slice(1).split('&');
    let _params = {};
    url.map(function (item, index) {
      let _t = item.split('=');
      _params[_t[0]] = _t[1];
    });
    return _params;
  }

  /**
     *  判断是否微信内部环境
     *  @return {Boolean}
      */

  isWeixin () {
    // 判断是否微信登陆
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }

  /**
       * 添加unity=true
        */
  addUrlParamUnity () {
    if (location.search.indexOf('unity') > -1) {
      return '&unity=true';
    } else {
      return '';
    }
  }

  /**
     *    转化单位 -> w
     *    @param {number} _number
     *    @return {string}
    */
  converToW (_number) {
    _number = Number.parseInt(_number, 10);
    if (_number > 10000) {
      _number = (_number / 10000).toFixed(2);
      return _number + 'W';
    }
    return _number.toFixed(2);
  }

  /**
    *  转化时间格式时，自动补全单位的时间 例如 ： 0 -> 00
    *  @param {String} dateTime
    *  @return {string}
     */

  addSingleTime (s) {
    if (typeof s !== 'number' && typeof s !== 'string') throw new Error('参数格式错误！');
    if (s.toString().length === 1) {
      return '0' + s;
    }
    return '' + s;
  }

  /**
      *  处理异步事件组成的数组，并按照指定顺序执行，这里data是针对交易所的数据格式
      *  @param {Array} list, 异步事件组成的数组,异步事件都提供回掉函数作为参数
      *  @param {Function} callback  当最后一个事件完成时调用
       */

  LineBlock (list, callback, data) {
    let _list = list, i = 0, promise = new Promise ((resolve, reject) => { resolve() })
    function der () { // 递归
      if (i > (_list.length - 1)) { callback && callback(); return; }
      return promise.then(() => {
        return new Promise((resolve, reject) => {
          _list[i](() => {
            i++;
            der();
          }, data ? { SiteName: 'leyou', Accounts: data[i] } : '');
        });
      });
    }

    der();
  }
}

export default new Util();
