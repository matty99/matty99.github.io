var json;

$(function() {
	$.get("json/app.json", function(data) {
		json = data;
	}).done(function() {
		createSelection();
		filterProfiles();
	});
});

// Precondition: Arrays must be sorted
function array_intersect(a, b) {
	var ai=0, bi=0;
	var result = [];

	while( ai < a.length && bi < b.length ) {
		if(a[ai] < b[bi] ){ ai++; }
		else if (a[ai] > b[bi] ){ bi++; }
		else {
			result.push(a[ai]);
			ai++;
			bi++;
		}
	}

	return result;
}

// Precondition: Arrays must be sorted
function array_intersect_boolean(a, b) {
	if (a.length === 0 || b.length === 0) return false;

	var ai=0, bi=0;

	while( ai < a.length && bi < b.length ) {
		if(a[ai] < b[bi] ){ ai++; }
		else if (a[ai] > b[bi] ){ bi++; }
		else {
			return true;
		}
	}

	return false;
}

function createSelection() {
	var selection = Mustache.render('{{#tags}}<li><div title="{{name}}" data-tag-id="{{id}}" class="circle"><span class="{{icon}}"></span></div></li>{{/tags}}', json);
	$("#selection-filter").html(selection);

	$("#selection-filter .circle").click(function() {
		$(this).toggleClass("selected");
		filterProfiles();
	});
}

function filterProfiles() {
	var filters = [];
	$("#selection-filter .selected").each(function() {
		filters.push($(this).attr("data-tag-id"));
	});

	if(filters.length === 0) {
		displayProfiles({"people": json.people});
	} else {
		var people = [];
		for(var i = 0; i < json.people.length; i++) {
			if(array_intersect_boolean(json.people[i].tags, filters)) {
				people.push(json.people[i]);
			}
		}
		displayProfiles({"people":people});
	}
}

function displayProfiles(people) {
	$.get("templates/profile.mst", function(template) {
		$("#people").html(Mustache.render(template, people));
	});
}