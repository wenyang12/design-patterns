//继承（采用类式继承）
function extend(subClass,superClass) {
	function F() {};
	F.prototype = superClass.prototype;
	subClass.prototype = new F();
	subClass.prototype.constructor = subClass;
	//解耦子类继承父类时，对父类的引用
	subClass.superClass = superClass.prototype
	if(superClass.prototype.constructor == Object.prototype.constructor){
		superClass.prototype.constructor = superClass;
	}
}