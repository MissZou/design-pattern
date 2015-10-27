//装饰者模式

//目标

/*var sale=new Sale(100);
sale=sale.decorate('fedtax').decorate('money').getPrice();
*/

function Sale(price){
	this.price=price||100;
}

Sale.prototype.getPrice=function(){
	return this.price;
};

Sale.decorators={};

Sale.decorators.fedtax={
	getPrice:function(){
		var price=this.uber.getPrice();
		//先从父对象的方法获取值
		price+=price*5/100;
		return price;
	}
};

Sale.decorators.money={
	getPrice:function(){
		var price=this.uber.getPrice();
		//先从父对象的方法获取值
		
		return "$ "+price;
	}
};

Sale.prototype.decorate=function(decorator){
	var F=function(){},
	overrides=this.constructor.decorators[decorator],
	i,
	newobj;
	F.prototype=this;
	newobj=new F();
	newobj.uber=F.prototype;
	for(i in overrides){
		if(overrides.hasOwnProperty(i)){
			newobj[i]=overrides[i];
		}
	}
	return newobj;
};

//方法二  使用列表实现  简单些
function Sale(price){
	this.price=price||100;
	this.decorators_list=[];
}

Sale.decorators={};
Sale.decorators.fedtax={
	getPrice:function(price){
		return price+price*5/100;
	}
};
Sale.decorators.money={
	getPrice:function(price){
		return "$ "+price;
	}
};

Sale.prototype.decorate=function(decorator){
	this.decorators_list.push(decorator);
	return this;  //为了链式调用
};

Sale.prototype.getPrice=function(){
	var price=this.price,
	i,
	max=this.decorators_list.length,
	name;
	for(i=0;i<max;i++){
		name=this.decorators_list[i];
		price=Sale.decorators[name].getPrice(price);
	}

	return price;
};

/*var sale=new Sale(100);
sale.decorate("fedtax").decorate("money");
sale.getPrice();*/


