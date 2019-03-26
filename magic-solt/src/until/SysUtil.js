export default {
  isAndroid: function () {
    var u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  },
  isIos: function () {
    var u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  },
  isWeixinBrowser: function () {
    var ua = navigator.userAgent.toLowerCase();
    return !!(/micromessenger/.test(ua));
  },
  isNative: function () {
    var u = navigator.userAgent;
    return u.indexOf('JHELLO') > -1;
  }
};
