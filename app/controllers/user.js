const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const User = require('../models/user');

exports.getUser = async (ctx, next) => {
	//如果id != 1抛出API 异常
    // if(ctx.query.id != 1){
    //     throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
    // }

    ctx.body = {name: 1111, session: ctx.session.user}
}

exports.registerUser = async (ctx, next) => {
	const _user = JSON.parse(ctx.request.body);
    const ctxBody = {user: _user.name, registerUser: true};
	User.findOne({name: _user.name}, (err, user) => {
        if (err) new ApiError(ApiErrorNames.USER_NOT_FOUND);
        if (user) {
            ctxBody.registerUser = false;
        }else {
            const user = new User(_user);
            user.save((err, user) => {
                if (err) new ApiError(ApiErrorNames.USER_NOT_FOUND);
            })
            ctx.session.user = 11111;
        }
    })
    console.log(ctx.session)
    ctx.body = ctxBody;
}