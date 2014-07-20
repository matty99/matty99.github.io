var json;
var id = 1;

$(function() {
    $.get("json/app.json", function(data) {
        json = data;
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
        $.get("templates/tabbed-profile.mst", function(template) {
            $("#tabbed-profile").html(Mustache.render(template, profile));
        });

        $.get("templates/tabbed-profile-alt.mst", function(template) {
            $("#tabbed-profile-alt").html(Mustache.render(template, profile));
            activateLinks();
        });
    }
}

function activateLinks() {
    $(".section").hide();
    $(".intro").show();

    $(".show a").click(function() {
        $(".section").hide();
        if ($(this).attr("data-id") == 1) $(".intro").show();
        if ($(this).attr("data-id") == 2) $(".work").show();
        if ($(this).attr("data-id") == 3) $(".impact").show();
        if ($(this).attr("data-id") == 4) $(".experience").show();
        if ($(this).attr("data-id") == 5) $(".tips").show();

        return false;
    });
}