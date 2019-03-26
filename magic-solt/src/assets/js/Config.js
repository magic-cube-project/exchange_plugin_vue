

module.exports = {

  /* 端口 */
  DEFUALTPORT : 7000,             //默认端口
  SOCKETPORT  : 7200,             //长链端口
  SMALLPROT   : 7001,             //微服端口
  GAMEPORT    : 7500,             //游戏端口


  /* 地址 */
  H5URL     : "https://pro.mofangvr.com/",                   // 网页地址
  HTTPURL   : "http://pro.mofangvr.com",                     // 短链地址
  // H5URL     : "https://develop.mofangvr.com/",                  // 网页地址
  // HTTPURL   : "http://develop.mofangvr.com",                    // 短链地址
  // H5URL     : "https://test.mofangvr.com/",                  // 网页地址
  // HTTPURL   : "http://test.mofangvr.com",                    // 短链地址
  // H5URL     : "https://develop.mofangvr.com/",               // 网页地址
  // HTTPURL   : "http://192.168.1.100:7000",                   // 短链地址

  URL_BROADCASTER_INFO : "/broadcaster/user",
  URL_OPEN_TYPE : "/broadcaster/open/type",             // 游戏类型切换
  URL_GAME_COUNT : "/broadcaster/game/count",           // 游戏输赢数量
  URL_GITT_COUNT : "/broadcaster/gift/count",           // 礼物赠送数量
  URL_FANS_COUNT : "/broadcaster/follow/list",          // 粉丝列表数据
  URL_SCENE_COUNT : "/broadcaster/scene/count",         // 直播持续时间
  URL_LUCKY_COUNT : "/broadcaster/lucky/record",        // 爱心列表数据 
  
  URL_QI_NIU : "/home/qiniu",                           // 直播图片设置
  URL_LIVE_RECORD : "/broadcaster/scene/list",          // 直播列表数据
  URL_GAME_RECORD : "/broadcaster/game/list",           // 游戏类型列表
  URL_DATA_EDITER : "/broadcaster/user/edit",           // 更改主播设备和类型
  URL_GIFT_RECORD : "/broadcaster/gift/record",         // 礼物列表记录
  URL_USER_GAME_DETAIL : "/player/game/record",         // 游戏记录列表
  URL_USER_LUCKY_DETAIL : "/player/lucky/record",       // 爱心记录列表
  URL_USER_GIFT_DETIAL : "/player/gift/record",         // 礼物记录列表
  URL_USER_DIAMOND_DETAIL : "/player/recharge/diamond",
  URL_USER_WEALTH_DETAIL : "/player/recharge/wealth",
  URL_USER_PRESENT_DETAIL : "/player/recharge/presention",



  LOG : true,

  IsNullOrEmpty : function ( obj )
  {
    if ( typeof obj == "undefined" || obj == null || obj == "" )
    {
      return true;
    }
    else
    {
      return false;
    }
  },

  Info : function ( info )
  {
    if( this.LOG )
    {
      console.log( "Http___" , info );
    }
  },

  Print : function ( info )
  {
    if( this.LOG )
    {
      console.log( "Print___" , info );
    }
  },

  Resolve : function ( name, json )
  {
    if( this.LOG )
    {
      console.log( "Resolve___" , name, json );
    }
  },

  Reject  : function ( name, json )
  {
    if( this.LOG )
    {
      console.log( "Reject___" , name, json );
    }
  },

}