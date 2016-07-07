// 假设一个圆的圆心坐标是(a,b)，半径为r，

// 则圆上每个点的X坐标=a + Math.sin(2*Math.PI / 360) * r ；Y坐标=b + Math.cos(2*Math.PI / 360) * r ；



var arc = 2*Math.PI/360;
  var b = 0;
  var s = 45;//度数
  var x=200,//圆心
      y=200;
  X = x+Math.sin(s*arc) * 100;
  Y = y-Math.cos(s*arc) * 100;//这里是减去