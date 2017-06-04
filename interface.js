//接口类
// @name String 接口名
// @methods Array 要实现的方法数组
function Interface (name, methods) {
	//先判断传入的参数是否符合规定
	if (arguments.length !== 2) {
		throw new Error("Interface构造函数接受到的参数只有" + arguments.length +
			"个，正确的应该要传入2个参数。");
	}
	this.name = name;
	this.methods = [];
	//遍历传入的方法数组，判断是否符合，接口名都是字符串，是才放入this.method数组里。
	for (var i = 0, len = methods.length; i < len; i++) {
		if (typeof methods[i] !== 'string') {
			throw new Error("Interface构造函数传入的方法methods数组里必须都为字符串");
		}
		this.methods.push(methods[i]);
	}
}
Interface.ensureImplements = function (object) {
	//检查传入的参数是否符合
	if ( arguments.length < 2) {
		throw new Error("Function Interface.ensureImplements 传入的参数只有" + arguments.length +
			"个，正确的应该要传入最少2个参数");
	}
	//遍历从第二参数开始的所有接口
	for (var i = 1, len = arguments.length; i < len; i++) {
		//判断传送的是否是接口对象
		var interface = arguments[i];
		if (interface.constructor !== Interface) {
			throw new Error("Function Interface.ensureImplements 传入的第二个参"+
				"数或往后的参数，应该为Interface类的实例");
		}
		//遍历接口所含的一系列方法名，看传入的第一个参数对象object是否都已经实现
		for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
			var method = interface.methods[j];
			if(!object[method] || typeof object[method] !== 'function') {
				throw new Error("Function Interface.ensureImplements: 检测到有对象"
					+"没有实现"+interface.name +"接口里的"+method+"方法");
			}
		}
	}
}
//使用
//先定义一个接口 var myInterface = new Interface("myInterface",["getName","getAge"])
/*然后定义一个对象 
var myObject = { //implements myInterface
	_name: "wen",
	_age: "29",
	getName: function () {
		return this._name;
	},
	getAge: function () {
		return this._age;
	}
}*/
//检查这个对象myObject是否已经实现了定义的接口 Interface.ensureImplements(myObject,myInterface)