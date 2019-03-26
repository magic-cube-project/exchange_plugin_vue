
/**
     * 正则表达式：验证用户名
     */
let REGEX_USERNAME = new RegExp('^[a-zA-Z0-9_-]{4,16}$');

/**
     * 正则表达式：验证密码
     */
let REGEX_PASSWORD = new RegExp('^[a-zA-Z0-9]{6,20}$');

/**
     * 正则表达式：验证手机号,增加19的手机号
     */
let REGEX_MOBILE = new RegExp('^((17[0-9])|(14[0-9])|(19[0-9])|(13[0-9])|(15[^4,\\D])|(18[0,5-9]))\\d{8}$');

/**
 * 正则表达式：验证手机号,增加19的手机号
 */
let REGEX_MOBILE_NEW = new RegExp(/^1(3|4|5|7|8)\d{9}$/);

/**
     * 正则表达式：验证邮箱
     */
let REGEX_EMAIL = new RegExp('^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$');

/**
     * 正则表达式：验证汉字
     */
let REGEX_CHINESE = new RegExp('^[\u4e00-\u9fa5],{0,}$');

/**
     * 正则表达式：验证身份证
     */
let REGEX_ID_CARD = new RegExp('(^\\d{18}$)|(^\\d{15}$)');


/**
     * 正则表达式：验证IP地址
     */
let REGEX_IP_ADDR = new RegExp('(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)');

export default {
  isUsername (username) {
    if (REGEX_USERNAME.test(username)) {
      return true;
    } else {
      return false;
    }
  },
  isPassword (password) {
    if (REGEX_PASSWORD.test(password)) {
      return true;
    } else {
      return false;
    }
  },
  isMobile (mobile) {
    if (REGEX_MOBILE.test(mobile)) {
      return true;
    } else {
      return false;
    }
  },
  isMobileNew (mobile) {
    if (REGEX_MOBILE_NEW.test(mobile)) {
      return true;
    } else {
      return false;
    }
  },
  isEmail (email) {
    if (REGEX_EMAIL.test(email)) {
      return true;
    } else {
      return false;
    }
  },
  isChinese (chinese) {
    if (REGEX_CHINESE.test(chinese)) {
      return true;
    } else {
      return false;
    }
  },
  isIDCard (idCard) {
    if (REGEX_ID_CARD.test(idCard)) {
      return true;
    } else {
      return false;
    }
  },
  isIPAddr (ipAddr) {
    if (REGEX_IP_ADDR.test(ipAddr)) {
      return true;
    } else {
      return false;
    }
  }
}
