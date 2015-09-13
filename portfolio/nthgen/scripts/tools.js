// Collapse mobile menu when a link is clicked
$(function() {  
  $("#top-nav-collapse ul li a").each(function() {
    $(this).click(function() {
      if ($("#top-nav-collapse").hasClass("in")) $("#top-nav-collapse").addClass("collapse").removeClass("in");
    });
  });
});

// Collapse mobile menu on scroll
$(document).on("scroll", function() {
  if (Modernizr.video && !Modernizr.touch) {
    if ($("#top-nav-collapse").hasClass("in")) $("#top-nav-collapse").addClass("collapse").removeClass("in");
  }
});

// Hide mobile menu on resize
$(window).resize(function() {
  if ($("#top-nav-collapse").hasClass("in")) $("#top-nav-collapse").addClass("collapse").removeClass("in");
});

// Add thousandth commas to an integer string
function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

// Return randomized array
function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // swap with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Put a span around every character in a given element
function spanWrapEach(element) {
  element.each(function(index, value) {
    var text = $(this).html();
    $(this).html(text.replace(/(.)/g, "<span>$1</span>"));
  });
}

// Create a static anchor point on the page
function createAnchorPoint(a_id, position) {
  var anchor = $("<div>", {id: a_id});
  anchor.css({
    "position" : "absolute",
    "top" :  position + "px",
  });
  $("body").append(anchor);
}