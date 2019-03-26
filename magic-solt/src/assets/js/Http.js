'use strict';

import Config from '../js/Config';

var Http = {};

window.Http = Http;

Http.get = function ( data ) 
{
  var url = data.root + data.path;                                                        //访问地址
  var time  = data.time  || 15000;                                                        //设置超时
  var sucFn = data.sucFn || new Function();                                               //成功回调
  var errFn = data.errFn || new Function();                                               //失败回调
  var headOparetion = data.headOparetion || {};                                           //头部信息
  new GetReq( url, data.data, sucFn, errFn, time, data.withCredentials, headOparetion );  //创建请求
};

Http.post = function ( data ) 
{
  var url = data.root + data.path;                                                        //访问地址
  var time  = data.time  || 15000;                                                        //设置超时
  var sucFn = data.sucFn || new Function();                                               //成功回调
  var errFn = data.errFn || new Function();                                               //失败回调
  var headOparetion = data.headOparetion || {};                                           //头部信息
  new PostReq( url, data.data, sucFn, errFn, time, data.withCredentials, headOparetion ); //创建请求
};

Http.json = function ( data ) 
{
  var url = data.root + data.path;
  var time  = data.time  || 15000; 
  var sucFn = data.sucFn || new Function();
  var errFn = data.errFn || new Function();
  var headOparetion = data.headOparetion || {};
  new JsonReq( url, data.data, sucFn, errFn, time, data.withCredentials, headOparetion );
};

Http.form = function ( data ) 
{
  var url = data.root + data.path;
  var time  = data.time  || 15000;
  var sucFn = data.sucFn || new Function();
  var errFn = data.errFn || new Function();
  var headOparetion = data.headOparetion || {};
  new FormReq( url, data.data, sucFn, errFn, time, data.withCredentials, headOparetion );
};

/**
   * 创建一个get的数据请求
   * @param {*} url     访问地址
   * @param {*} data    传入参数
   * @param {*} sucFn   成功回调
   * @param {*} errFn   失败回调
   */
function GetReq ( url, data, sucFn, errFn, time, withCredentials, headOparetion ) 
{
  var xhr = createXhr();

  url += '?';

  var datastr = '';

  for ( var i in data ) { datastr += i + '=' + data[i] + '&'; }

  datastr = datastr.slice ( 0, datastr.length - 1 );

  url += datastr;

  xhr.withCredentials = withCredentials || false;

  xhr.open('get', encodeURI(url), true);

  for(let key in headOparetion){ xhr.setRequestHeader(key,headOparetion[key]); }

  new OnreadyStateChange( xhr, sucFn, errFn, time );
  
  xhr.send();
}

/**
   * 创建一个post请求
   * @param {*} url     访问地址
   * @param {*} data    传入参数
   * @param {*} sucFn   成功回调
   * @param {*} errFn   失败回调
   */
function PostReq ( url, data, sucFn, errFn, time, withCredentials, headOparetion ) 
{
  var xhr = createXhr ();

  var datastr = '';

  for ( var i in data ) { datastr += i + '=' + data[i] + '&'; }

  datastr = datastr.slice ( 0, datastr.length - 1 );

  xhr.withCredentials = withCredentials || false;

  xhr.open( 'post', url, true );

  xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );

  for( let key in headOparetion ) { xhr.setRequestHeader(key,headOparetion[key]); }

  new OnreadyStateChange( xhr, sucFn, errFn, time );

  xhr.send( datastr );
}

/**
 * 创建一个post请求
 * @param {*} url
 * @param {*} data
 * @param {*} sucFn
 * @param {*} errFn
 */
function JsonReq ( url, data, sucFn, errFn, time, withCredentials, headOparetion ) 
{
  let xhr = createXhr();

  let datastr = JSON.stringify(data);

  xhr.withCredentials = withCredentials || false;

  xhr.open( 'post', url, true );

  xhr.setRequestHeader( 'Content-Type', 'application/json' );

  for( let key in headOparetion ) { xhr.setRequestHeader(key,headOparetion[key]); }
  
  new OnreadyStateChange(xhr, sucFn, errFn);

  xhr.send( datastr );
}

/**
   * 创建一个From请求
   * @param {*} url     访问地址
   * @param {*} data    传入参数
   * @param {*} sucFn   成功回调
   * @param {*} errFn   失败回调
   */
function FormReq ( url, data, sucFn, errFn, time, withCredentials, headOparetion ) 
{
  var xhr = createXhr();

  var form = new FormData();

  for ( var i in data ) { form.append(i, data[i]); }
  
  xhr.withCredentials = withCredentials || false;

  xhr.open( 'post', url, true );

  for(let key in headOparetion ) { xhr.setRequestHeader(key,headOparetion[key]); }

  new OnreadyStateChange( xhr, sucFn, errFn, time );

  xhr.send( form );
}

/**
   * 监听当前的xml的变化
   * @param {*} xhr     请求句柄
   * @param {*} sucFn   成功回调
   * @param {*} errFn   失败回调
   */
function OnreadyStateChange ( xhr, sucFn, errFn, time ) 
{
  var timeout = setTimeout ( function () { execFn( errFn ); }, time );

  xhr.onreadystatechange = function () 
  {
    if ( xhr.readyState == 4 ) 
    {
      var json = JSON.parse( xhr.responseText );

      json.code = xhr.status;

      if ( xhr.status == 200 ) 
      {  
        clearTimeout( timeout );
        execFn( sucFn, json );
      } 
      else if ( xhr.status == 400 || xhr.status == 401 || xhr.status == 403 || xhr.status == 404 || xhr.status == 500  || xhr.status == 503 ) 
      {
        execFn( errFn, json );
      }
      else
      {
        execFn( errFn, json );

        console.log( "CODE = ", xhr.status );
      }
    }
  };
}

/**
   * 执行函数
   * @param {*} fn    回调方法
   * @param {*} data  返回数据
   */
function execFn ( fn, json ) 
{
  var fn = fn || new Function( '' );

  try 
  {
    Config.Info( json );

    fn ( json );
  } 
  catch ( error ) { Config.Info( "execFn_error____" ); Config.Info( error ); Config.Info( "____error_execFn" ); }
}

/**
   * 创建一个网络请求句柄
   */
function createXhr () 
{
  return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
}

export default Http;
