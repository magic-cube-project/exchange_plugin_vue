<template>
  <div class="market">
    <div class="market-head">
      <div class="return" @click="close" style="z-index:1"></div>
  
    </div>
        <img src="../assets/image/help_bg.png" alt="" style="width:100%;">
  </div>
</template>

<script>

export default {
  data() {
    return {

        }

    },

    methods:{
         close() {
            // if (sysUtil.isAndroid()) {
            //     Android.closeWeb();
            // } else {
            //     window.webkit.messageHandlers.closeWeb.postMessage(null);
            // }

            this.$router.push({
                path:`/market`
            })
        },
    },

  mounted() {
    
  },
  created() {
    
  }
};
</script>

<style lang="less" scoped>

.market {
  display: block;
//   width: calc(100% - 1.6rem);
//   padding: 0 0.8rem 0 0.8rem;
  height: 100%;
  background: url("../assets/image/market/market_solt_bg.png") center
    center no-repeat;
  background-size: cover;
  overflow: auto;
  .market-head {
    position: absolute;
    margin-top: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .return {
      margin-left: 20px;
      margin-right: 20%;
      width: 2.5rem;
      height: 1.9rem;
      background: url("../assets/image/market/return.png") center center
        no-repeat;
      background-size: cover;
    }
    
    }
  }
  .market img{
      width:100%;
  }
  </style>