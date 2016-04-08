export default (type, length) => {
	if (length > 16) {
		return;
	}

	let colors = [
		'#E84035', '#E01D5F', '#9C28B1', '#673BB7', //色系1--------  1     (0 )
		'#4050B2', '#2196F3', '#01AAF8', '#00BCD5', //色系2--------  2     (4 )
		'#009784', '#4CAF53', '#87C148', '#CDDC39', //色系3--------  3     (8 )
		'#FFEE58', '#F8CF1D', '#FF9803', '#F5511E' //色系4--------  4     (12)     
	];

	switch (type) {
		case 1:
			break;
		case 2:
			var arr = colors.splice(0, 4);
			colors = colors.concat(arr);
			break;
		case 3:
			var arr = colors.splice(0, 8);
			colors = colors.concat(arr);
			break;
		case 4:
			var arr = colors.splice(0, 12);
			colors = colors.concat(arr);
			break;
		default:
			break;
	}
	return colors.splice(0, length);
}