var test = ['1','2','3','4','5'];
for(var i = 0;i < (test.length-1)/2;i++){
	var temp = test[i];
	test[i] = test[test.length-1-i];
	test[test.length-1-i] = temp;
}
console.log(test);