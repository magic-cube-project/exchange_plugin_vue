export default {
  /**
   * 获取get参数
   */
  getValue: (key) => {
    return (function () {
      var url = window.location.href.toString().split('#')[1];
      var u = url.split('?');
      if (typeof (u[1]) === 'string') {
        u = u[1].split('&');
        var get = {};
        for (var i in u) {
          var j = u[i].split('=');
          get[j[0]] = j[1];
        }
        return get;
      } else {
        return {};
      }
    })()[key];
  }
}