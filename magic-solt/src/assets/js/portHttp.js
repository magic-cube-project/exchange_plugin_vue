import Http from '../../lib/http';
import config from '../../config/index';
import Vue from 'vue';

export default {
  name: 'http',
  thirdPartyGetByJson: function (path, data, option) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'get',
        url: config.third_party_url + path,
        data: data,
        headers: option && option.headers || null,
        dataType: 'json',
        beforeSend: option && option.beforeSend,
        success: function (data) {
          var json = JSON.parse(data);
          if (json.Success) {
            resolve(json);
          } else {
            reject(json);
            Vue.$vux.loading.hide();
            Vue.$vux.toast.text(json.ErrorMsg);
          }
        },
        error: function (err) {
          Vue.$vux.loading.hide();
          Vue.$vux.toast.text('网络错误');
          reject();
        }
      });
    });
  },
  thirdPartyPostByJson: function (path, data) {
    return new Promise(function (resolve, reject) {
      Http.post({
        root: config.third_party_url,
        path: path,
        data: data || {},
        sucFn: function (data) {
          var json = JSON.parse(data);
          if (json.Success) {
            resolve(json);
          } else {
            reject(json);
            Vue.$vux.loading.hide();
            Vue.$vux.toast.text(json.ErrorMsg);
          }
        },
        errFn: function () {
          Vue.$vux.loading.hide();
          Vue.$vux.toast.text('网络错误');
          reject();
        }
      });
    });
  },
  thirdPartyGet: function (path, data, headOparetion) {
    return new Promise(function (resolve, reject) {
      Http.get({
        root: config.third_party_url,
        path: path,
        data: data || {},
        headOparetion: headOparetion,
        sucFn: function (data) {
          var json = JSON.parse(data);
          if (json.Success || json.success) {
            resolve(json);
          } else {
            reject(json);
            Vue.$vux.loading.hide();
            Vue.$vux.toast.text(json.ErrorMsg);
          }
        },
        errFn: function () {
          Vue.$vux.loading.hide();
          Vue.$vux.toast.text('网络错误');
          reject();
        }
      });
    });
  },
  thirdPartyPost: function (path, data) {
    return new Promise(function (resolve, reject) {
      Http.post({
        root: config.third_party_url,
        path: path,
        data: data || {},
        sucFn: function (data) {
          var json = JSON.parse(data);
          if (json.Success) {
            resolve(json);
          } else {
            reject(json);
            Vue.$vux.loading.hide();
            Vue.$vux.toast.text(json.ErrorMsg);
          }
        },
        errFn: function () {
          Vue.$vux.loading.hide();
          Vue.$vux.toast.text('网络错误');
          reject();
        }
      });
    });
  },
  // get方法
  gettest: function (path, data) {
    return new Promise(function (resolve, reject) {
      Http.get({
        root: 'http://api.mofangvr.com/',
        path: path,
        data: data || {},
        headOparetion: {
          'user-token': localStorage.getItem('user-token') || null
        },
        withCredentials: true,
        sucFn: function (data) {
          data = data.replace(/[\r\t\n]/g, '');
          var json = JSON.parse(data);
          if (json.error == null) {
            resolve(json);
          } else {
            reject(json);
            if (json.error.code == '-10015') {
              Vue.$vux.loading.hide();
            } else {
              Vue.$vux.loading.hide();
              Vue.$vux.toast.text(json.error.message);
            }
          }
        },
        errFn: function () {
          Vue.$vux.loading.hide();
          Vue.$vux.toast.text('网络错误');
          reject();
        }
      });
    });
  },
  // get方法
  get: function (path, data) {
    return new Promise(function (resolve, reject) {
      Http.get({
        root: config.server_url,
        path: path,
        data: data || {},
        headOparetion: {
          'user-token': localStorage.getItem('user-token') || null
        },
        withCredentials: true,
        sucFn: function (data) {
          data = data.replace(/[\r\t\n]/g, '');
          var json = JSON.parse(data);
          if (json.error == null) {
            resolve(json);
          } else {
            reject(json);
            if (json.error.code == '-10015') {
              Vue.$vux.loading.hide();
            } else {
              Vue.$vux.loading.hide();
              Vue.$vux.toast.text(json.error.message);
            }
          }
        },
        errFn: function () {
          Vue.$vux.loading.hide();
          Vue.$vux.toast.text('网络错误');
          reject();
        }
      });
    });
  },
  // post方法
  post: function (path, data) {
    return new Promise(function (resolve, reject) {
      Http.post({
        root: config.server_url,
        path: path,
        data: data || {},
        // headOparetion: {
        //   'user-token': localStorage.getItem('user-token') || null
        // },
        withCredentials: true,
        sucFn: function (data) {
          var json = JSON.parse(data);
          if (json.error == null) {
            resolve(json);
          } else {
            reject(json);
            if (json.error.code == '-10015') {
              Vue.$vux.loading.hide();
            } else {
              Vue.$vux.loading.hide();
              Vue.$vux.toast.text(json.error.message);
            }
          }
        },
        errFn: function () {
          Vue.$vux.loading.hide();
          Vue.$vux.toast.text('网络错误');
          reject();
        }
      });
    });
  },
  // json 方法
  json: function (path, data) {
    return new Promise(function (resolve, reject) {
      Http.json({
        root: config.server_url,
        path: path,
        data: { params: data, id: new Date().getTime() } || {},
        // headOparetion: {
        //   'user-token': localStorage.getItem('user-token') || null
        // },
        withCredentials: true,
        sucFn: function (data) {
          var json = JSON.parse(data);
          if (json.error == null) {
            resolve(json);
          } else {
            reject(json);
            if (json.error.code == '-10015') {
              Vue.$vux.loading.hide();
            } else {
              Vue.$vux.loading.hide();
              Vue.$vux.toast.text(json.error.message);
            }
          }
        },
        errFn: function () {
          Vue.$vux.loading.hide();
          Vue.$vux.toast.text('网络错误');
          reject();
        }
      });
    });
  },
  // form 方法
  form: function (path, data) {
    return new Promise(function (resolve, reject) {
      Http.form({
        root: config.server_url,
        path: path,
        data: data || {},
        // headOparetion: {
          // 'user-token': localStorage.getItem('user-token') || null
        // },
        withCredentials: true,
        sucFn: function (data) {
          var json = JSON.parse(data);
          if (json.error == null) {
            resolve(json);
          } else {
            reject(json);
            if (json.error.code == '-10015') {
              Vue.$vux.loading.hide();
            } else {
              Vue.$vux.loading.hide();
              Vue.$vux.toast.text(json.error.message);
            }
          }
        },
        errFn: function () {
          Vue.$vux.loading.hide();
          Vue.$vux.toast.text('网络错误');
          reject();
        }
      });
    });
  },
  //luluVr域名
  lulupost: function (path, data) {
    return new Promise(function (resolve, reject) {
      Http.post({
        root: config.lulu_server_url,
        path: path,
        data: data || {},
        // headOparetion: {
        //   'token': localStorage.getItem('user-token') || null
        // },
        // withCredentials: true,
        sucFn: function (data) {
          var json = JSON.parse(data);
          if (json.error == null) {
            resolve(json);
          } else {
            reject(json);
            if (json.error.code == '-10015') {
              Vue.$vux.loading.hide();
            } else {
              Vue.$vux.loading.hide();
              Vue.$vux.toast.text(json.error.message);
            }
          }
        },
        errFn: function (data) {

          var text = "网络错误";
          try {
            var json = JSON.parse(data);
             text = json.message;
          } catch (error) {
            
          }
          Vue.$vux.loading.hide();
          Vue.$vux.toast.text(text);
          reject();
        }
      });
    });
  },
  luluget: function (path, data) {
    return new Promise(function (resolve, reject) {
      Http.get({
        root: config.lulu_server_url_no,
        path: path,
        data: data || {},
        headOparetion: {
          'token': localStorage.getItem('user-token') || null
        },
        withCredentials: true,
        sucFn: function (data) {
          var json = JSON.parse(data);
          if (json.error == null) {
            resolve(json);
          } else {
            reject(json);
            if (json.error.code == '-10015') {
              Vue.$vux.loading.hide();
            } else {
              Vue.$vux.loading.hide();
              Vue.$vux.toast.text(json.error.message);
            }
          }
        },
        errFn: function () {
          Vue.$vux.loading.hide();
          Vue.$vux.toast.text('网络错误');
          reject();
        }
      });
    });
  },
};
