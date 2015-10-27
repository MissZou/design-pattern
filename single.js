//单例模式


//预期行为
/*var uni=new Universe();
var uni2=new Universe();
uni===uni2 //true*/

//方法一
//在Universe构造函数的静态属性中缓存单个实例
function Universe(){
	if(typeof Universe.instance==="object"){
		return Universe.instance;
	}

	this.start_time=0;
	this.bang="Big";

	//缓存
	Universe.instance=this;

	//隐式返回
	//return this;
}

var uni=new Universe();
var uni2=new Universe();
uni===uni2
//true
Universe.prototype.add=function(){return "add";}
uni.add()
//"add"
uni2.add()
//"add"

//方法二
function Universe(){
	//缓存实例
	var instance;

	//重写构造函数
	Universe=function(){
		return instance;
	};

	//保留原型属性
	Universe.prototype=this;

	//实例
	instance=new Universe();

	//重置构造函数指针
	instance.constructor=Universe;

	instance.start_time=0;
	instance.bang="Big";

	return instance;
}


//方法三
var Universe;

(function(){
	var instance;
	Universe=function(){
		if(instance){
			return instance;
		}

		instance=this;

		this.start_time=0;
		this.bang="Big";
	};
}());