//工厂模式

//目标
/*var car1=CarMaker.factory('Compact');
var car2=CarMaker.factory("Convertible");
car1.drive(); //4
car2.drive(); //2*/


function CarMaker(){}

CarMaker.prototype.drive=function(){
	return "I have"+this.doors;
};

//静态工厂方法
CarMaker.factory=function(type){
	var constr=type,
	newcar;

	//如果构造函数不存在，则发生错误
	if(typeof CarMaker[constr]!=="function"){
		throw{
			name:"Error",
			message:constr+"不存在"
		};
	}

	//此时构造函数是存在的
	//使原型继承父类，但仅继承一次
	if(typeof CarMaker[constr].prototype.drive!=="function"){
		CarMaker[constr].prototype=new CarMaker();
	}

	//创建一个新的实例
	newcar=new CarMaker[constr]();

	//.....


	return newcar;

};

//定义特定的汽车制造商
CarMaker.Compact=function(){
	this.doors=4;
};

CarMaker.Convertible=function(){
	this.doors=2;
};

CarMaker.SUV=function(){
	this.doors=24;
};

