//目标
/*需要验证数据是否有效

var data={
	first_name:"Weiyun",
	last_name:"Zou",
	age:"unknown",
	username:"d_D"
};

//配置验证要求
validator.config={
	first_name:"isNonEmpty",
	age:"isNumber",
	username:"isAlphaNum"
};

//调用
validator.validate(data);
if(validator.hasErrors()){
	console.log(validator.messages.join("\n"));
}*/

var validator={
	//所有可用的检查
	types:{},

	//在当前验证中的错误消息
	messages:[],

	//当前验证配置
	//名称：验证类型
	config:{},

	//接口方法
	validate:function(data){
		var i,
		msg,
		type,
		checker,
		result_ok;

		//重置所有消息
		this.messages=[];

		for(i in data){
			if(data.hasOwnProperty(i)){
				type=this.config[i];
				checker=this.types[type];

				if(!type){
					continue; //不需要验证
				}
				if(!checker){
					throw {
						name:"ValidationError",
						message:"没有"+type
					};
				}
				result_ok=checker.validate(data[i]);
				if(!result_ok){
					msg="无效值"+i +checker.instructions;
					this.messages.push(msg);
				}

			}
		}
		return this.hasErrors();
	},

	//帮助程序
	hasErrors:function(){
		return this.messages.length !==0;
	}
};

validator.types.isNonEmpty={
	validate:function(value){
		return value !=="";
	},
	instructions:"不能为空"
};

validator.types.isNumber={
	validate:function(value){
		return !isNaN(value);
	},
	instructions:"必须是数字"
};

validator.types.isAlphaNum={
	validate:function(value){
		return !/[^a-z0-9]/i.test(value);
	},
	instructions:"只能包含字母和数字"
};