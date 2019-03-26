import Http from './Http';
import Config from './Config';

export default {

	/**
	* 统一模板 Get 请求
	* @param {*} port 接口路由
	* @param {*} json 请求参数
	* @param {*} name 方法名字
	* @param {*} time 超时时间
	* @param {*} sucFn 成功回调
	* @param {*} errFn 失败回调
	*/
	Get : function ( port, sucFn, errFn, name, json, time )
	{
		this.Get_HTTP ( port, json, time ).then
		(
			json => 
			{
				Config.Resolve( name, json );

				if( !Config.IsNullOrEmpty ( json ) )
				{
					if( !Config.IsNullOrEmpty ( sucFn ) ) sucFn( json.data );
				}
				else
				{
					if( !Config.IsNullOrEmpty ( sucFn ) ) sucFn ();
				}
			}
		).catch
		(
			function( json )
			{
				Config.Reject( name, json );

				if( !Config.IsNullOrEmpty ( errFn ) )  errFn();                 
			} 
		);
	},

    /**
    * 统一模板 Post 请求
    * @param {*} port 接口路由
    * @param {*} json 请求参数
    * @param {*} name 方法名字
    * @param {*} time 超时时间
    * @param {*} sucFn 成功回调
    * @param {*} errFn 失败回调
    */
    Post : function ( port, sucFn, errFn, name, json, time )
    {
        this.Post_HTTP ( port, json, time ).then
        (
            json => 
            {
                Config.Resolve( name, json );

                if( !Config.IsNullOrEmpty ( json ) )
                {
                    if( !Config.IsNullOrEmpty ( sucFn ) ) sucFn( json.data );
                }
                else
                {
                    if( !Config.IsNullOrEmpty ( sucFn ) ) sucFn ();
                }
            }
        ).catch
        ( 
            function( json )
            {
                Config.Reject( name, json );

                if( !Config.IsNullOrEmpty ( errFn ) )  errFn();                 
            } 
        );
    },

    /**
    * 统一模板 Get 请求
    * @param {*} port 接口路由
    * @param {*} json 请求参数
    * @param {*} name 方法名字
    * @param {*} time 超时时间
    * @param {*} sucFn 成功回调
    * @param {*} errFn 失败回调
    */
    Get_ROOT : function ( root, port, sucFn, errFn, name, json, time )
    {
			this.Get_ROOT_HTTP ( root, port, json, time ).then
			(
				json => 
				{
					Config.Resolve( name, json );

					if( !Config.IsNullOrEmpty ( json ) )
					{
						if( !Config.IsNullOrEmpty ( sucFn ) ) sucFn( json.data );
					}
					else
					{
						if( !Config.IsNullOrEmpty ( sucFn ) ) sucFn ();
					}
				}
			).catch
			(
				function( json )
				{
					Config.Reject( name, json );

					if( !Config.IsNullOrEmpty ( errFn ) )  errFn();                 
				} 
			);
    },

   /**
   * 统一模板 Post 请求
   * @param {*} port 接口路由
   * @param {*} json 请求参数
   * @param {*} name 方法名字
   * @param {*} time 超时时间
   * @param {*} sucFn 成功回调
   * @param {*} errFn 失败回调
   */
    Post_ROOT : function ( root, port, sucFn, errFn, name, json, time )
    {
			this.Post_ROOT_HTTP ( root, port, json, time ).then
			(
				json => 
				{
					Config.Resolve( name, json );

					if( !Config.IsNullOrEmpty ( json ) )
					{
						if( !Config.IsNullOrEmpty ( sucFn ) ) sucFn( json.data );
					}
					else
					{
						if( !Config.IsNullOrEmpty ( sucFn ) ) sucFn ();
					}
				}
			).catch
			( 
				function( json )
				{
					Config.Reject( name, json );

					if( !Config.IsNullOrEmpty ( errFn ) )  errFn();                 
				} 
			);
    },

    /**
     * Http Get Request
     * @param {*} path 请求路由
     * @param {*} data 请求参数
     * @param {*} time 请求超时
     */
    Get_HTTP: function ( path, data, time ) 
    {
        return new Promise(function ( resolve, reject ) 
        {
            Http.get(
            {
                root : Config.HTTPURL,

                path : path,

                time : time || 15000,

                data : data || {},

                headOparetion:{ 'token': "e6ad94cf-88ee-40e5-8b93-7d0f81dd236e_b" || null },

                sucFn : function ( json ) 
                {
                    if( !Config.IsNullOrEmpty( json.message ) ) { alert( json.message ); }

                    if ( json.code == 200 ) { resolve( json ); }

                    else reject( json );
                },

                errFn : function ( json ) 
                {
                    if ( !Config.IsNullOrEmpty( json ) )
                    {
                        if ( !Config.IsNullOrEmpty( json.message ) ) { alert( json.message ); }
                    }

                    reject( json );
                },
            });
        });
    },
    
    /**
     * Http Post Request
     * @param {*} path 请求路由
     * @param {*} data 请求参数
     * @param {*} time 请求超时
     */
    Post_HTTP: function ( path, data, time ) 
    {
        return new Promise(function ( resolve, reject ) 
        {
            Http.post(
            {
                root : Config.HTTPURL,

                path : path,

                time : time || 15000,

                data : data || {},

                headOparetion:{ 'token': "e6ad94cf-88ee-40e5-8b93-7d0f81dd236e_b" || null },

                sucFn : function ( json ) 
                {
                    if( !Config.IsNullOrEmpty( json.message ) ) { alert( json.message ); }

                    if ( json.code == 200 ) { resolve( json ); }

                    else reject( json );
                },

                errFn : function ( json ) 
                {
                    if ( !Config.IsNullOrEmpty( json ) )
                    {
                        if ( !Config.IsNullOrEmpty( json.message ) ) { alert( json.message ); }
                    }

                    reject( json );
                },
            });
        });
    },


    /**
     * Http Get Request
     * @param {*} path 请求路由
     * @param {*} data 请求参数
     * @param {*} time 请求超时
     */
    Get_ROOT_HTTP: function ( root, path, data, time ) 
    {
        return new Promise(function ( resolve, reject ) 
        {
            Http.get(
            {
                root : root,

                path : path,

                time : time || 15000,

                data : data || {},

                headOparetion:{ 'token': "e6ad94cf-88ee-40e5-8b93-7d0f81dd236e_b" || null },

                sucFn : function ( json ) 
                {
                    if( !Config.IsNullOrEmpty( json.message ) ) { alert( json.message ); }

                    if ( json.code == 200 ) { resolve( json ); }

                    else reject( json );
                },

                errFn : function ( json ) 
                {
                    if ( !Config.IsNullOrEmpty( json ) )
                    {
                        if ( !Config.IsNullOrEmpty( json.message ) ) { alert( json.message ); }
                    }

                    reject( json );
                },
            });
        });
    },
    
    /**
     * Http Post Request
     * @param {*} path 请求路由
     * @param {*} data 请求参数
     * @param {*} time 请求超时
     */
    Post_ROOT_HTTP: function ( root, path, data, time ) 
    {
        return new Promise(function ( resolve, reject ) 
        {
            Http.post(
            {
                root : root,

                path : path,

                time : time || 15000,

                data : data || {},

                headOparetion:{ 'token': "e6ad94cf-88ee-40e5-8b93-7d0f81dd236e_b" || null },

                sucFn : function ( json ) 
                {
                    if( !Config.IsNullOrEmpty( json.message ) ) { alert( json.message ); }

                    if ( json.code == 200 ) { resolve( json ); }

                    else reject( json );
                },

                errFn : function ( json ) 
                {
                    if ( !Config.IsNullOrEmpty( json ) )
                    {
                        if ( !Config.IsNullOrEmpty( json.message ) ) { alert( json.message ); }
                    }

                    reject( json );
                },
            });
        });
    },


    Get_H5: function ( path, data, time ) 
    {
        return new Promise(function ( resolve, reject ) 
        {
            Http.get(
            {
                root : Config.H5URL,

                path : path,

                time : time || 15000,

                data : data || {},

                headOparetion:{ 'token': "e6ad94cf-88ee-40e5-8b93-7d0f81dd236e_b" || null },

                sucFn : function ( data ) 
                {
                    var json = JSON.parse( data );

                    if( !Config.IsNullOrEmpty( json.message ) ) { Config.Print( json.message ); }

                    if ( json.code == 0 ) { resolve( json ); }

                    else reject( json );
                },
                errFn : function ( data ) 
                {
                    if ( !Config.IsNullOrEmpty( data ) )
                    {
                        var json = JSON.parse( data );

                        if ( !Config.IsNullOrEmpty( json ) ) { if ( !Config.IsNullOrEmpty( json.message ) ) alert( json.message ); }
                    }

                    reject();
                },

            });
        });
    },

    Post_H5: function ( path, data, time ) 
    {
        return new Promise(function ( resolve, reject ) 
        {
            Http.post(
            {
                root : Config.H5URL,

                path : path,

                time : time || 15000,

                data : data || {},

                headOparetion:{ 'token': "e6ad94cf-88ee-40e5-8b93-7d0f81dd236e_b" || null },

                sucFn : function ( data ) 
                {
                    var json = JSON.parse( data );

                    if( !Config.IsNullOrEmpty( json.message ) ) { Config.Print( json.message ); }

                    if ( json.code == 0 ) { resolve( json ); }

                    else reject( json );
                },
                errFn : function ( data ) 
                {
                    if ( !Config.IsNullOrEmpty( data ) )
                    {
                        var json = JSON.parse( data );

                        if ( !Config.IsNullOrEmpty( json ) ) { if ( !Config.IsNullOrEmpty( json.message ) ) alert( json.message ); }
                    }

                    reject();
                },

            });
        });
    },
};
