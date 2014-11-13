$('body').flowtype();

$('.page').each(function () {
	$(this).height(($(this).width()/4) * 3);
});

$('.section').each(function () {
	$(this).height($(this).width()/2);
});

$(window).resize(function () {
	$('.page').each(function () {
		$(this).height(($(this).width()/4) * 3);
	});

	$('.section').each(function () {
		$(this).height($(this).width()/2);
	});
});