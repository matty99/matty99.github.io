var json;
var id = 1;

$(function() {
	$.get("json/app.json", function(data) {
		json = data;
	}).done(function() {
		displayProfile(id);
	});
});

function getPersonById(id) {
	for(var i = 0; i < json.people.length; i++) {
		if (json.people[i].id == id) return json.people[i];
	}
	return null;
}

function displayProfile(id) {
	var profile = getPersonById(id);
	if (profile !== null) {
		$.get("templates/scrolling-profile.mst", function(template) {
			$("#scrolling-profile").html(Mustache.render(template, profile));
		}); //.done(activateLinks);
	} else {
		// default cotent
	}
}

// function activateLinks() {
// 	console.log("test");
// 	$(".ion-more").click(function() {
// 		var selector = $(this).attr("data-post");
// 		$("." + selector + " p").html(getPersonById(id).experience.body);
// 	});
// }