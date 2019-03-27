<template>
  <div class="market">
    <div class="market-head">
      <div class="return"></div>
      <div class="recharge-item">
        <div class="item-icon"></div>
        <span @click="jumpMall('mcc')">{{account.mcc}}</span>
      </div>
      <div class="recharge-item">
        <div class="clover"></div>
        <span @click="jumpMall('clv')">{{account.clover}}</span>
      </div>
    </div>
    <!-- 市场详情 -->
    <div class="market-detail">
      <img src="../assets/image/market/solt_detail_bg.png.png">
      <!-- <p class="title"></p> -->
      <div class="quotes">
        <p class="current-price lang-color-up">{{topData.curPrice}}</p>
        <p class="current-quotes">
          <span class="lang-color-up">{{topData.diffPrice > 0 ? '+' + topData.diffPrice :topData.diffPrice}}</span>
          <span class="lang-color-up">{{topData.profit > 0 ? '+' + topData.profit + '%': topData.profit + '%'}}</span>
        </p>
      </div>
      <div class="price-item highest-price">
        <p>{{$t('message.highest')}}</p>
        <span class="lang-color-up">{{topData.heighest}}</span>
      </div>
      <div class="price-item lowset-price">
        <p>{{$t('message.lowest')}}</p>
        <span class="lang-color-down">{{topData.lowest}}</span>
      </div>
      <div class="icon" @click="jumpExchange">
        <img src="../assets/image/market/exchange.png" alt=""/>
      </div>
    </div>
    <div class="nav-wrap">
      <div class="nav-item" :class=" tapStatus == 0? 'active': ''" @click="changeTap(0)"><p>{{$t('message.todayTake')}}</p></div>
      <div class="nav-item" :class=" tapStatus == 1? 'active': ''" @click="changeTap(1)"><p>{{$t('message.ranking')}}</p></div>
      <div class="nav-item" :class=" tapStatus == 2? 'active': ''" @click="changeTap(2)"><p>{{$t('message.record')}}</p></div>
    </div>

    <!-- 每日可领取 -->
    <div class="receive-wrap" v-show="tapStatus === 0">
      <!-- K线图 -->
      <div class="map" id="market"></div>
      <!-- 二级导航 -->
      <div class="subnav-wrap">
        <div
          class="subnav-item"
          :class=" subTapStatus == 0? 'active': ''"
          @click="changeSubTitle(0)"
        >
          <div class="red-dot" v-show="receiveCloverStatus === 0"></div>{{$t('message.jingyubi')}}
        </div>
        <div
          class="subnav-item"
          :class=" subTapStatus == 1? 'active': ''"
          @click="changeSubTitle(1)"
        >
          <div class="red-dot" v-show="receiveMCCStatus === 0"></div>{{$t('message.bonus')}}
        </div>
        <!-- <div class="help" @click="help"></div> -->
      </div>
      <!-- 四叶草可领取 -->
      <div class="clv-wrap" v-if="subTapStatus === 0">
        <div class="clv-item">
          <!-- <img :src="clvItemBg"> -->
          <p class="message">
            <label>{{$t('message.todayGrant')}}:</label>
            <span>{{clover.all}}</span>
          </p>
        </div>
        <div class="clv-item">
          <!-- <img :src="clvItemBg"> -->
          <p class="message">
            <label>{{$t('message.todayReceive')}}:</label>
            <span>{{clover.today}}</span>
          </p>
          <div
            class="receive-buttom"
            :class="receiveCloverStatus === 1 ? 'receive-buttom-success': ''"
            @click="receiveClover(43201)"
          >{{$t('message.receive')}}</div>
        </div>
      </div>
      <!-- 分红领取MCC -->
      <div class="mcc-wrap" v-if="subTapStatus === 1">
        <div class="clv-item">
          <!-- <img :src="clvItemBg"> -->
          <p class="message">
            <label>{{$t('message.weekReceive')}}:</label>
            <span>{{mcc.today}}</span>
          </p>
          <div
            class="receive-buttom"
            :class="receiveMCCStatus === 1 ? 'receive-buttom-success': ''"
          >{{$t('message.receive')}}</div>
        </div>
        <div class="clv-item">
          <!-- <img :src="clvItemBg"> -->
          <p class="message">
            <label>{{$t('message.weekGrant')}}:</label>
            <span>{{mcc.all}}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- 每日领取排行 -->
    <div class="rank-wrap" v-show="tapStatus === 1">
      <div class="rank-nav-wrap">
        <ul>
          <li
            class="rank-nav-item"
            :class=" rankTapStatus == 0? 'active': ''"
            @click="changeRankTap(0)"
          >{{$t('message.jingyuRank')}}</li>
          <li
            class="rank-nav-item"
            :class=" rankTapStatus == 1? 'active': ''"
            @click="changeRankTap(1)"
          >{{$t('message.MCCranking')}}</li>
        </ul>
      </div>
      <div class="clv-rank-wrap" v-show="rankTapStatus === 0">
        <div class="clv-rank-item" v-for="item in cloverRank" :key="item.index">
         <div class="clv-rank-wrap-bg" v-if="item.rankNum > 1"></div>
          <div class="level">
            <img :src="item.rankNumBg" v-show="item.rankNum <= 2">
            <span class="real-number" v-show="item.rankNum <= 2">{{item.rankNum + 1}}</span>
            <span v-show="item.rankNum > 2">{{item.rankNum}}</span>
          </div>
          <div class="personal">
            <div class="avatar">
              <img :src="item.avatar">
            </div>
            <div class="message">
              <p class="name">{{item.name}}</p>
              <div class="amount">
                <div class="cloverIcon">
                  <img :src="jingyubi" alt="">
                </div>
                <span>{{item.account}}</span>
              </div>
            </div>
          </div>
          <div class="qoutes">
            <p>{{item.qouter}}%</p>
          </div>
        </div>
        <div class="list-empty" v-if="cloverRank.length === 0">{{$t('message.noReceipt')}}</div>
      </div>
      <div class="mcc-rank-wrap" v-show="rankTapStatus === 1">
        <div class="clv-rank-item" v-for="item in MCCRank" :key="item.index">
          <div class="clv-rank-wrap-bg" v-if="item.rankNum > 1"></div>
          <div class="level">
            <img :src="item.rankNumBg" v-if="item.rankNum <= 2">
            <span class="real-number" v-show="item.rankNum <= 2">{{item.rankNum + 1}}</span>
            <span v-if="item.rankNum > 2">{{item.rankNum}}</span>
          </div>
          <div class="personal">
            <div class="avatar">
              <img :src="item.avatar">
            </div>
            <div class="message">
              <p class="name">{{item.name}}</p>
              <div class="amount">
                <div class="cloverIcon">
                  <img :src="jingyubi" alt="">
                </div>
                <span>{{item.account}}</span>
              </div>
            </div>
          </div>
          <div class="qoutes">
            <p>{{item.qouter}}%</p>
          </div>
        </div>
        <div class="list-empty" v-if="MCCRank.length === 0">{{$t('message.noRanking')}}</div>
      </div>
    </div>


    <div class="rank-wrap" v-show="tapStatus === 2">
    </div>

    


    











  </div>
</template>

<script>
import market from "../model/market.js";
import Http from "../lib/http.js";
import util from "../assets/js/util.js";
import tool from "../assets/js/tool.js";
import Kline from "../assets/js/echart.js";
import URLUtil from "../until/URLUtil.js";
import sysUtil from "../until/SysUtil.js";
import account from "../model/account.js";
import { userInfo } from "os";

export default {
  data() {
    return {
      tapStatus: 0,
      subTapStatus: 0,
      rankTapStatus: 0,
      jingyubi: 'http://img.cube.mofangvr.com/lulu/jingyubi.png',
      clvRankBg: 'http://img.cube.mofangvr.com/cube/clove.png',
      mccRankBg: "http://img.cube.mofangvr.com/cube/clv_rank_item_bg.png",
      clvItemBg: "http://img.cube.mofangvr.com/cube/clv_item_bg.png",
      avatar: "http://img.cube.mofangvr.com/cube/exchange_unlogin.png",
      levelImage: {
        0: "http://img.cube.mofangvr.com/lulu/market_level_new1.png",
        1: "http://img.cube.mofangvr.com/lulu/market_level_new2.png",
        2: "http://img.cube.mofangvr.com/lulu/market_level_new3.png"
      },
      topData: {
        curPrice: 0, //当前价格
        heighest: 0, //最高价
        lowest: 0, //最低价
        profit: 0, //盈利比例
        diffPrice: 0 //差价
      },
      clover: {
        today: 100, //今天可领取
        all: 100 //今天发放总额
      }, //四叶草
      account: {
        //个人账户
        clover: 0, //四叶草
        mcc: 0 //mcc
      },
      cloverRank: [], //今日四叶草领取排行榜
      mcc: {
        today: 100, //今日可领取MCC
        all: 100 //今日发放总额MCC
      },
      MCCRank: [], //今日领取MCC排行榜
      receiveCloverStatus: 1, //领取四叶草状态 0 为未领取 1为已领取
      receiveMCCStatus: 1, //领取MCC状态 0 为未领取 1为已领取
      userId: "",
      userPhone: "", // 用户手机号码
      resStr: "", //这是一个特殊的字段我也不知道反正一定不能少
      openId: "",
      receiveCloveSuccess: 0
    };
  },
  methods: {
    //切换主导航栏
    changeTap(currentStatus) {
      this.tapStatus = currentStatus;
    },
    //切换副导航栏
    changeSubTitle(currentStatus) {
      this.subTapStatus = currentStatus;
    },
    //每日领取排名导航栏
    changeRankTap(currentStatus) {
      this.rankTapStatus = currentStatus;
    },
    //请求四叶草市场行情
    getmarketInfo() {
      market.getLatestMarketDetail().then(res => {
        let deepMarket = res.result.market;
        console.log(deepMarket);
        this.topData = {
          diffPrice: Number(deepMarket.last - deepMarket.open).toFixed(2),
          curPrice: deepMarket.last, //当前价格
          //最高价
          heighest:
            deepMarket.high > 10000
              ? util.converToW(deepMarket.high)
              : Number(deepMarket.high).toFixed(4),
          //最低价
          lowest:
            deepMarket.low > 10000
              ? util.converToW(deepMarket.low)
              : Number(deepMarket.low).toFixed(4),
          profit: tool.formatPercent(
            (deepMarket.last - deepMarket.open) / deepMarket.open
          ) //涨跌幅
        };
        let upArr=document.querySelectorAll(".lang-color-up");
        let downArr=document.querySelectorAll(".lang-color-down");
        let lang =localStorage.getItem("lang");
        if(lang=="zh-CN"){
          upArr.forEach((val,index,arr)=>{
            val.style.color="#ff4465";
          })
          downArr.forEach((val,index,arr)=>{
            val.style.color="#25d441";
          })
        }else{
            upArr.forEach((val,index,arr)=>{
            val.style.color="#25d441";
          })
          downArr.forEach((val,index,arr)=>{
            val.style.color="#ff4465";
          })
        }
      });
    },
    //获取K线数据
    getklineInfo() {
      var time = 900;
      var periodTime = 27000;

      //初始化K线图
      market.getKlinesDetail(periodTime, time).then(res => {
        var resData = res;
        var KlineData = [];

        resData.result.forEach(item => {
          let KlineDate = new Date(item[0]);
          var _KlineDtata = [];

          _KlineDtata.push(formatDateByHour(KlineDate));
          // _KlineDtata.push(formatMyDate(KlineDate));
          _KlineDtata.push(item[1]);
          _KlineDtata.push(item[2]);
          _KlineDtata.push(item[4]);
          _KlineDtata.push(item[3]);
          _KlineDtata.push((item[6] * 1).toFixed(2));
          KlineData.push(_KlineDtata);
        });

        function formatMyDate(str) {
          var oDate = new Date(str * 1000),
            oYear = oDate.getFullYear(str),
            oMonth = oDate.getMonth(str) + 1,
            oDay = oDate.getDate(),
            oTime = getzf(oMonth) + "-" + getzf(oDay);
          return oTime;
        }

        function formatDateByHour(str) {
          var oDate = new Date(str * 1000),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds(),
            oTime = getzf(oHour) + ":" + getzf(oMin) + ":" + getzf(oSen);
          return oTime;
        }

        //补0操作
        function getzf(num) {
          if (parseInt(num) < 10) {
            num = "0" + num;
          }
          return num;
        }

        let appEchart = echarts.init(document.querySelector("#market"));
        let option = Kline(KlineData);
        appEchart.setOption(option);
      });
    },

    //跳转交易所
    jumpExchange() {
      window.location.href =
        "http://exchange.mofangvr.com?from=game&r_url="+window.location.href;
    },
    
  },
  mounted() {},
  created() {
    this.getmarketInfo();
    this.getklineInfo();

    let tel = URLUtil.getValue("tel");
    this.userPhone = tel;
    localStorage.setItem("tel", this.userPhone);
  }
};
</script>

<style lang="less" scoped>
.market {
  display: block;
  width: calc(100% - 1.6rem);
  padding: 0 0.8rem 0 0.8rem;
  height: 100%;
  background: url("http://img.cube.mofangvr.com/lulu/market_solt_bg.png") center
    center no-repeat;
  background-size: cover;
  overflow: hidden;
  .market-head {
    margin-top: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .return {
      margin-right: 20%;
      width: 1.9rem;
      height: 1.9rem;
      background: url("../assets/image/market/return.png") center center
        no-repeat;
      background-size: cover;
    }
    .recharge-item {
      display: flex;
      align-items: center;
      width: 8.6rem;
      height: 1.7rem;
      background: url("../assets/image/market/recharge_item_bg.png") center
        center no-repeat;
      background-size: contain;
      .clover {
        margin-right: 0.4rem;
        width: 1.3rem;
        height: 1.3rem;
        background: url("https://img.cube.mofangvr.com/1550230578769") center center
          no-repeat;
        background-size: cover;
      }
      .item-icon {
        margin-right: 0.4rem;
        width: 1.3rem;
        height: 1.3rem;
        background: url("http://img.cube.mofangvr.com/cube/MCC_icon.png") center
          center no-repeat;
        background-size: cover;
      }
      span {
        flex: 1;
        font-size: 0.8rem;
        line-height: 1.5rem;
        color: #ffffff;
        text-align: left;
      }
      &:last-child {
        margin-left: 0.8rem;
      }
    }
  }
  .market-detail {
    margin-top: 2.1rem;
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 6.8rem;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .quotes {
      flex: 1;
      z-index: 2;
      .current-price {
        margin-left: 1.7rem;
        font-size: 1.3rem;
        line-height: 1.4;
        color: #ff4465;
        font-style: italic;
        font-weight: bold;
      }
      .current-quotes {
        margin: 0.2rem 0 0.3rem 1.4rem;
        font-size: 0.9rem;
        line-height: 1.4;
        color: #ff4465;
        span{
          margin-right:0.3rem;
        }
      }
    }
    .price-item {
      z-index: 2;
      p {
        font-size: 1re;
        line-height: 1.4;
        color: #ffffff;
      }
      span {
        margin-top: 0.4rem;
        font-size: 0.9rem;
        line-height: 1.4;
        color: #ffffff;
      }
    }
    .highest-price {
      margin-right: 0.6rem;
      span {
        color: #e4035d;
      }
    }
    .lowset-price {
      margin-right: 1rem;
      span {
        color: #25d441;
      }
    }
    .icon {
      margin-right: 1.1rem;
      width: 4.7rem;
      height: 4rem;
      position: relative;
      // color: #ffffff;
      // background: url("http://img.cube.mofangvr.com/lulu/solt_exchange_bg.png") center
      //   center no-repeat;
      background-size: initial;
      z-index: 2;
      // border: 2px solid #410037;
      img{
        position:absolute;
        width:5,48rem;
        height:2.34rem;
        left:0; 
        top:1rem;
      }
      p {
        font-size: 1rem;
        line-height:1.5;
        text-align: center;
        font-weight: bold;
        &:first-child {
          margin-top: .5rem;
        }
      }
    }
  }
  .nav-wrap {
    margin: 1.6rem 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .nav-item {
      width: 6.2rem;
      height: 2.4rem;
      background: url('http://img.cube.mofangvr.com/lulu/slot_change_item_new.png') center center no-repeat;
      background-size: contain;
      p {
        font-size: 1rem;
        line-height: 2rem;
        color: #C9559C;
        font-weight: bold;
        text-align: center;
      }
    }
    .active {
      width: 6.2rem;
      height: 2.4rem;
      background: url("http://img.cube.mofangvr.com/lulu/slot_change_item_active_new.png") center
        center no-repeat;
      background-size: cover;
      border-image: 0;
      box-shadow:0 0 0 0;
      border: 0;
      p {
         color: #ffffff;
      }
    }
  }
  .subtitle {
    margin-top: 1rem;
    font-size: 0.8rem;
    line-height: 1.4;
    color: #ffffff;
  }
  .receive-wrap {
    width: 100%;
    height: 58%;
    overflow-y: scroll;
    .map {
      width: 100%;
      height: 16.6rem;
    }
    .subnav-wrap {
      margin-top: 1.3rem;
      display: flex;
      align-items: center;
      .subnav-item {
        position: relative;
        margin-right: 1.1rem;
        font-size: 1rem;
        line-height: 1.4;
        color: #717171;
        &:last-child {
          margin-right: 0.4rem;
        }
        .red-dot {
          position: absolute;
          top: -0.1rem;
          right: -0.1rem;
          width: 0.4rem;
          height: 0.4rem;
          background-color: #ff161b;
          border-radius: 50%;
        }
      }
      .active {
        position: relative;
        color: #ffffff;
        &:after {
          position: absolute;
          left: 50%;
          bottom: -0.2rem;
          content: "";
          width: 70%;
          height: 1px;
          background: url("../assets/image/market/market_active_line.png")
            center center no-repeat;
          background-size: cover;
          transform: translate(-50%);
        }
      }
    }
    .clv-wrap,
    .mcc-wrap {
      margin-top: 1.1rem;
      overflow: scroll;
      .clv-item {
        position: relative;
        display: flex;
        align-items: center;
        margin: 0 auto;
        // margin-bottom: 0.6rem;
        width: 94.5%;
        height: 2.4rem;
        border-radius: 0.3rem;
        // border:1px solid;
        // border-image:linear-gradient(90deg, rgba(228,3,93,1), rgba(56,163,253,1)) 1 1;
        img {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
        }
        .message {
          flex: 1;
          margin-left: 0.6rem;
          font-size: 0.9rem;
          line-height: 2.4rem;
          color: #ffffff;
          z-index: 2;
        }
        .receive-buttom {
          margin-right: 0.8rem;
          width: 3.9rem;
          height: 1.6rem;
          border-radius: 0.8rem;
          background: url('http://img.cube.mofangvr.com/lulu/receive_activepng.png') center center no-repeat;
          background-size: cover;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
          line-height: 1.6rem;;
          z-index: 2;
          &:active {
            opacity: 0.9;
          }
        }
        .receive-buttom-success {
          background: url('');
          background-color: #cccccc;
        }
      }
    }
  }
  .rank-wrap {
    width: 100%;
    height: 63%;
    overflow: scroll;
    margin-top: 1.6rem;
    .rank-nav-wrap ul {
      display: flex;
      align-items: center;
      .rank-nav-item {
        font-size: 0.9rem;
        line-height: 1.4;
        color: #aaaaaa;
        &:first-child {
          margin: 0 0.8rem 0 1.3rem;
        }
      }
      .list-empty {
        text-align: center;
        color: #ffffff;
      }
      .active {
        position: relative;
        color: #ffffff;
        &:after {
          position: absolute;
          left: 50%;
          bottom: -0.2rem;
          content: "";
          width: 70%;
          height: 1px;
          background-color: #ffffff;
          border-radius: 0.6rem;
          transform: translate(-50%);
          // transform: scaleY(0.5);
        }
      }
    }
    .clv-rank-wrap,
    .mcc-rank-wrap {
      margin: 1.1rem 0 2.1rem 0;
      .clv-rank-item {
        position: relative;
        margin: 0 auto;
        margin-bottom: 0.8rem;
        display: flex;
        align-items: center;
        width: 94.5%;
        height: 2.8rem;
        background:rgba(136,0,83,1);
        
        border-radius: .3rem;
        .clv-rank-wrap-bg {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          // background:#630000;
          background:rgba(69,11,32,0.65);
          z-index: 2;
        }
        .level {
           position: relative;
          margin: 0 0.8rem;
          width: 1.9rem;
          height: 2rem;
          z-index: 2;
          span {
            font-size: 1.2rem;
            width: 100%;
            line-height: 2rem;
            color: #ffffff;
            text-align: center;
            font-weight: bold;
          }
          .real-number {
            position: absolute;
            right: 0.2rem;
            top: 0.21rem;
            width: .9rem;
            height: .9rem;
            font-size: 0.7rem;
            line-height: 1;
            color: #ffffff;
            font-weight: normal;
          }
          img {
            width: 100%;
            height: 100%;
            background-color: #880053;
          }
        }
        .personal {
          flex: 1;
          display: flex;
          align-items: center;
          z-index: 2;
          .avatar {
            width: 1.9rem;
            height: 1.9rem;
            border-radius: 0.6rem;
            background-color: #ffffff;
            img {
              width: 100%;
              height: 100%;
              border-radius: 0.6rem;
            }
          }
          .message {
            margin-left: .9rem;
            font-size: 0.8rem;
            line-height: 1.4;
            color: #ffffff;
            .amount {
              display: flex;
              align-items: center;
              .cloverIcon {
                margin-right: .3rem;
                width: 0.8rem;
                height: 0.8rem;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
        .qoutes {
          margin-right: 0.3rem;
          width: 5.3rem;
          height: 1.5rem;
          background: url("http://img.cube.mofangvr.com/lulu/market_quotes_bg_new.png") center
            center no-repeat;
          background-size: cover;
          overflow: hidden;
          z-index: 2;
          p {
            font-size: 0.9rem;
            line-height: 1.3rem;
            text-align: center;
            color: #ffffff;
          }
        }
      }
      .list-empty {
        text-align: center;
        color: #ffffff;
      }
    }
  }
}
</style>
