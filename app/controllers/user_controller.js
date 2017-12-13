const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
exports.getUser = async (ctx, next) => {
	//如果id != 1抛出API 异常
    if(ctx.query.id != 1){
        throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
    }
    ctx.body = {
        username: '小楼兰',
        age: 20
    }
}

exports.registerUser = async (ctx, next) => {
	console.log('registerUser', ctx.request.body)
}