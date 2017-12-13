
const ApiErrorNames = require('./ApiErrorNames');
/**
* 自定义api异常
*/

class ApiError extends Error {

	constructor(error_name) {
		super();

		const error_info = ApiErrorNames.getErrorInfo(error_name);
        this.name = error_name;
        this.code = error_info.code;
        this.message = error_info.message;
	}

}

module.exports = ApiError;