//更改根节点字体大小
function htmlFontSize() {
	var font_size = document.body.clientWidth / 320 * 100;
	document.getElementsByTagName('html')[0].style.fontSize = font_size + 'px'
};
window.onresize = htmlFontSize;
htmlFontSize();