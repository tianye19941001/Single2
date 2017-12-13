/**
 * 在app.use(router)之前调用
 */

 const ApiError = require('../app/error/ApiError');

 const res_format = async (ctx) => {
 	// 先执行路由

 	// 如果有返回数据，将数据添加到data中
 	if (ctx.body) {
 	  ctx.body = {
        code: 0,
        message: 'success',
        data: ctx.body 
      }
    } else {
      ctx.body = {
        code: 0,
        message: 'success'
      }
 	}
 }

const url_filter = function(pattern) {
	return async (ctx, next) => {
		const reg = new RegExp(pattern);
		
		try {
			//先去执行路由
        	await next();
		} catch (error) {
			//如果异常类型是API异常并且通过正则验证的url，将错误信息添加到响应体中返回。
            if(error instanceof ApiError && reg.test(ctx.originalUrl)){
                ctx.status = 200;
                ctx.body = {
                    code: error.code,
                    message: error.message
                }
                console.log(ctx)
            }
            //继续抛，让外层中间件处理日志
		}

		// 通过正则判断并进行url处理
        if (reg.test(ctx.originalUrl)) {
        	res_format(ctx);
        }
	}
}

 module.exports = url_filter;