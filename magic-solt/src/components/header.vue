<template>
  <div id="header">
    <i class="arrow-left " @click="goback"></i>
    <img  :src="title" />
  </div>
</template>

<script>
import SysUtil from ".././until/SysUtil.js";

export default {
  props: {
    title: {
      type: String,
      default: "标题"
    },
    isBack: {
      type: null,
      default: 1
    }
  },
  data() {
    return {
      headShow: true,
      showArrow: true,
      isNative: ""
    };
  },
  components: {},
  created() {
    
    if (SysUtil.isWeixinBrowser()) {
      this.headShow = false;
    } else {
      this.isNative = true;
    }
  },
  mounted() {
    if (this.isBack == 0) {
      this.showArrow = false;
    }
  },
  computed: {},
  methods: {
    //返回
    goback() {
      history.back();
    }
  }
};
</script>

<style>
#header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 7.75rem;
  font-size: 0;
  background-color: #000000;
  z-index: 2;
}
#header img {
  width: calc(100% - 5.25rem);
  height: 6rem;
  margin-top: 1rem;
  margin-left: 2.625rem;
  margin-right: 2.625rem;
}
.arrow-left {
  position: absolute;
  top: 50%;
  width: 2rem;
  height: 2rem;
  transform: translateY(-50%);
  margin-left: .625rem;
  vertical-align: middle;
  background: url("../assets/image/arraws.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}

.nativeHeader {
  padding-top: 10px;
}
</style>
