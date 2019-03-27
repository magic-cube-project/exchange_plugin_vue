// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex';
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n';

import LangEn from './lib/en.js';
import LangZh from './lib/zh.js';
import {
  LoadingPlugin, ToastPlugin, AlertPlugin, ConfirmPlugin
} from 'vux';

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(Vuex);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(VueI18n);


let lang;
function getLang(){
  lang =localStorage.getItem("lang");
  if(lang==null){
      var browserLang=navigator.language||navigator.userLanguage;
      if(browserLang=="zh-CN"){
          localStorage.setItem("lang", browserLang);
          lang=localStorage.getItem("lang");
          return lang;
      }else{
          localStorage.setItem("lang","en-US");
          lang=localStorage.getItem("lang");
          return lang;
      }
  }else{
      return lang;
  }
}


const i18n = new VueI18n({
  locale: getLang(),
  messages: {
    'en-US': LangEn,
    'zh-CN': LangZh,
  }
})

var store = new Vuex.Store({// store对象
  state: {
    states: 'turn-on',
    userAccount: {
      // avatorImg: '',
      // name: '',
      // id: ''
    },
    loginStatus: 0 // 用户登录为1 未登录为0
  },
  getters: {
    addUserInfo: (state) => {
      return state.states + 'change';  
    }
  },
  mutations: {
    setTransition (state, states) {
      state.states = states;
    },
    setUserInfo (state, userAccount) {
      state.userAccount = userAccount;
    },
    setLoginStatus (state, loginStatus) {
      state.loginStatus = loginStatus;
    }
  }
});

new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
