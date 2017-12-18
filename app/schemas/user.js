const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_TIME = 10;
const UserSchema = new mongoose.Schema({
	name:{
		unique:true,
		type:String
	},
	password:String,
	role: {
		type:Number,
		default:0
	},
	meta:{
		creatAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})
UserSchema.pre('save',function(next) {
	const user = this;
	if (this.isNew) {
		this.meta.creatAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	bcrypt.genSalt(SALT_TIME,function(err,salt){
		if (err) return next(err);
		bcrypt.hash(user.password,salt,function(err,hash){
			if (err) return next(err);
			user.password = hash;
			next();
		})
	})
})
UserSchema.methods = {
	comparePassword: function(_passwod,cb){
		bcrypt.compare(_passwod,this.password,function(err,isMatch){
			if (err) cb(err);
			cb(null,isMatch);
		})
	}
}
UserSchema.statics = {
	fetch: function(cb){
		return this.find({}).sort('meta.updateAt').exec(cb);
	},findById: function(id,cb){
		return this.findOne({_id: id}).exec(cb);
	}
}
module.exports = UserSchema;