var publisher={
	subscribers:{
		any:[] //时间类型：订阅者
	},
	subscribe:function(fn,type){
		type=type||"any";
		if(typeof this.subscribers[type]==="undefined"){
			this.subscribers[type]=[];
		}
		this.subscribers[type].push(fn);
	},
	unsubscribe:function(fn,type){
		this.visitSubscribers("unsubscribe",fn,type);
	},
	publish:function(publication,type){
		this.visitSubscribers("publish",publication,type);
	},
	visitSubscribers:function(action,arg,type){
		var pubtype=type||"any",
		subscribers=this.subscribers[pubtype],
		i,
		max=subscribers.length;

		for(i=0;i<max;i++){
			if(action==="publish"){
				subscribers[i](arg);  //subscribers[i]是function  e.g. joe.drinkCoffee("big news today")
			}/*else{
				if(subscribers[i]===arg){
					alert(i)
					alert(arg)
					subscribers.splice(i,1);
				}
			}*/
		}
	}
};

function makePublisher(o){  //将对象转换为一个发布者
	var i;
	for(i in publisher){
		if(publisher.hasOwnProperty(i) && typeof publisher[i]==="function"){
			o[i]=publisher[i];
		}
	}
	o.subscribers={any:[]};
}

var paper={  //发布日报和月刊
	daily:function(){
		this.publish("big news today");
	},
	monthly:function(){
		this.publish("monthly news","monthly");
	}
};

makePublisher(paper);  //将paper构造成一个发布者

//订阅者对象
var joe={
	drinkCoffee:function(papers){
		console.log("Just read "+papers);
	},
	sundayPreNap:function(monthly){
		console.log("About to read "+monthly);
	}
};

//paper注册joe
//也就是 joe向paper订阅
paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.sundayPreNap,"monthly");

//触发事件
paper.daily();
paper.daily();
paper.daily();
paper.monthly();

makePublisher(joe);   //让joe可以发布tweet
joe.tweet=function(msg){
	this.publish(msg);
};

paper.readTweets=function(tweet){
	alert("Someone "+tweet);
};

joe.subscribe(paper.readTweets);

//现在，只要joe发布消息，paper就会得到提醒
joe.tweet("hate assignment!");



